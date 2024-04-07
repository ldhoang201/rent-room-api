const knex = require("../config/knex");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("./auth/auth.service");

const retrieveAll = async () => {
  try {
    const users = await knex("users").select("*");
    return users;
  } catch (error) {
    throw error;
  }
};

const retrieveByCriteria = async (criteria, value) => {
  console.log(criteria);
  try {
    const user = await knex("users")
      .where({ [criteria]: value })
      .first();
    return user;
  } catch (error) {
    throw error;
  }
};

const retrieveBalance = async (userId) => {
  try {
    const balances = await knex("users")
      .select("balance")
      .where("user_id", userId);
    return balances[0].balance;
  } catch (error) {
    throw error;
  }
};

const update = async (userId, userData) => {
  try {
    await knex("users").where({ user_id: userId }).update(userData);
    const updatedUser = await retrieveByCriteria("user_id", userId);
    const newAccessToken = generateToken(updatedUser, "1h");
    const newRefreshToken = generateToken(updatedUser, "7d");
    return { newAccessToken, newRefreshToken };
  } catch (error) {
    throw error;
  }
};

const updatePassword = async (userId, password) => {
  try {
    const newPassword = await bcrypt.hash(password, 10);
    await knex("users")
      .where({ user_id: userId })
      .update({ hashed_password: newPassword });
    return true;
  } catch (error) {
    throw error;
  }
};

const updateEmail = async (userId, email) => {
  try {
    await knex("users").where({ user_id: userId }).update({ email });
    return true;
  } catch (error) {
    throw error;
  }
};

const updateService = async (
  userId,
  amountToSub,
  service_id,
  service_expiry_date
) => {
  try {
    await Promise.all([
      knex("users").where({ user_id: userId }).update({
        service_id: service_id,
        service_expiry_date: service_expiry_date,
      }),
      updateBalance(userId, -amountToSub),
    ]);
  } catch (error) {
    throw error;
  }
};

const updateBalance = async (userId, amountToUpdate) => {
  try {
    const currentUserBalance = await knex("users")
      .select("balance")
      .where("user_id", userId)
      .first();

    if (!currentUserBalance) {
      throw new Error("User not found");
    }

    const currentBalance = currentUserBalance.balance;
    const newBalance = currentBalance + amountToUpdate;

    await knex("users")
      .where("user_id", userId)
      .update({ balance: newBalance });

    return newBalance;
  } catch (error) {
    throw error;
  }
};

const save = async (userData) => {
  try {
    const savedUser = await knex("users").insert(userData).returning("*");
    return savedUser[0];
  } catch (error) {
    throw error;
  }
};

const remove = async (userId) => {
  try {
    await knex("users").where({ user_id: userId }).del();
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports.retrieveAll = retrieveAll;
module.exports.retrieveBalance = retrieveBalance;
module.exports.retrieveByCriteria = retrieveByCriteria;
module.exports.updateEmail = updateEmail;
module.exports.updatePassword = updatePassword;
module.exports.update = update;
module.exports.updateBalance = updateBalance;
module.exports.updateService = updateService;
module.exports.save = save;
module.exports.remove = remove;

const knex = require("../config/knex");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("./auth/auth.service");

const retrieveAll = async () => {
  try {
    const users = await knex("users")
      .select(
        "users.user_id",
        "users.user_name",
        "users.email",
        "users.phone",
        "users.avatar",
        "users.balance",
        "users.is_blocked",
        "users.service_expiry_date",
        "roles.role_name",
        "services.service_name"
      )
      .leftJoin("roles", "users.role_id", "roles.role_id")
      .leftJoin("services", "services.service_id", "users.service_id")
      .whereNot("role_name", "admin");
    return users;
  } catch (error) {
    throw error;
  }
};

const retrieveByCriteria = async (criteria, value) => {
  try {
    const user = await knex("users")
      .where({ [criteria]: value })
      .first();
    return user;
  } catch (error) {
    throw error;
  }
};

const retrieveById = async (userId) => {
  try {
    const user = await knex("users")
      .select(
        "users.user_id",
        "users.user_name",
        "users.email",
        "users.phone",
        "users.role_id",
        "users.avatar"
      )
      .where({ user_id: userId })
      .first();
    return user;
  } catch (error) {
    throw error;
  }
};

const retrieveService = async (userId) => {
  try {
    const service = await knex("users")
      .select("service_id")
      .where("user_id", userId)
      .first();
    return service.service_id;
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

const updateBlockedStatus = async (userId, isBlocked) => {
  try {
    await knex("users").where("user_id", userId).update({
      is_blocked: isBlocked,
    });
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

const updateForAdmin = async (userId, userData) => {
  try {
    await knex("users").where({ user_id: userId }).update(userData);
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
module.exports.retrieveById = retrieveById;
module.exports.updateEmail = updateEmail;
module.exports.updatePassword = updatePassword;
module.exports.update = update;
module.exports.updateBalance = updateBalance;
module.exports.retrieveService = retrieveService;
module.exports.updateService = updateService;
module.exports.updateBlockedStatus = updateBlockedStatus;
module.exports.updateForAdmin = updateForAdmin;
module.exports.save = save;
module.exports.remove = remove;

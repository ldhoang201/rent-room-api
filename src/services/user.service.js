const knex = require("../config/knex");
const crypto = require("crypto");
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
        "users.created_at",
        "users.service_expiry_date",
        "roles.role_name",
        "services.service_name"
      )
      .leftJoin("roles", "users.role_id", "roles.role_id")
      .leftJoin("services", "services.service_id", "users.service_id")
      .whereNot("role_name", "admin")
      .orderBy("users.service_id", "asc")
      .orderBy("users.created_at", "desc");

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
    // Hash the password using SHA-256
    const newPassword = sha256(password);
    console.log(newPassword);
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

const countTotal = async () => {
  const result = await knex("users").count("* as total");
  const total = result[0].total;
  return total;
};

const updateService = async (
  userId,
  amountToSub,
  newServiceId,
  newServiceExpiryDate
) => {
  try {
    const newService = await knex("services")
      .where({ service_id: newServiceId })
      .first();

    if (!newService) {
      throw new Error("Không tìm thấy dịch vụ");
    }

    const user = await knex("users").where({ user_id: userId }).first();

    if (!user) {
      throw new Error("Không tìm thấy người dùng");
    }

    const currentServiceId = user.service_id;
    const currentExpiryDate = user.service_expiry_date;

    let finalExpiryDate = newServiceExpiryDate;

    if (currentServiceId === newServiceId && currentExpiryDate) {
      const currentDate = new Date();
      const expiryDate = new Date(currentExpiryDate);

      if (expiryDate > currentDate) {
        const remainingDaysCurrent = Math.ceil(
          (expiryDate - currentDate) / (1000 * 60 * 60 * 24)
        );
        const newExpiryDate = new Date(newServiceExpiryDate);
        const remainingDaysNew = Math.ceil(
          (newExpiryDate - currentDate) / (1000 * 60 * 60 * 24)
        );
        const totalRemainingDays = remainingDaysCurrent + remainingDaysNew;

        finalExpiryDate = new Date(
          currentDate.getTime() + totalRemainingDays * 24 * 60 * 60 * 1000
        )
          .toISOString()
          .split("T")[0];
      }
    }

    const updatedNumPurchases = newService.num_purchases + 1;
    await knex("services")
      .where({ service_id: newServiceId })
      .update({ num_purchases: updatedNumPurchases });

    await Promise.all([
      knex("users").where({ user_id: userId }).update({
        service_id: newServiceId,
        service_expiry_date: finalExpiryDate,
      }),
      updateBalance(userId, -amountToSub),
    ]);
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
};

const updateBalance = async (userId, amountToUpdate) => {
  try {
    const currentUser = await knex("users")
      .select("balance")
      .where("user_id", userId)
      .first();

    if (!currentUser) {
      throw new Error("User not found");
    }

    const currentBalance = currentUser.balance;
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

function sha256(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

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
module.exports.countTotal = countTotal;

const knex = require("../config/knex");

const save = async (payload) => {
  let {
    user_id,
    amount,
    card_type,
    bank_code,
    transaction_info,
    transaction_code,
  } = loadTransactionFromVNPObj(payload);
  await knex("transactions").insert({
    user_id: user_id,
    amount: amount,
    card_type: card_type,
    bank_code: bank_code,
    transaction_code: transaction_code,
    transaction_info: transaction_info,
  });
};

const retrieveAllByUser = async (user_id) => {
  try {
    const transactions = await knex("transactions")
      .where("user_id", user_id)
      .select("*")
      .orderBy("transaction_date", "desc");
    return transactions;
  } catch (error) {
    console.error("Error retrieving transactions by user id:", error);
    throw error;
  }
};

const loadTransactionFromVNPObj = (vnpObj) => {
  return {
    user_id: vnpObj.user_id,
    amount: vnpObj.vnp_Amount,
    card_type: vnpObj.vnp_CardType,
    bank_code: vnpObj.vnp_BankCode,
    transaction_code: vnpObj.vnp_ResponseCode,
    transaction_info: vnpObj.vnp_OrderInfo,
  };
};

const retrieveInRange = async (startDate, endDate) => {
  try {
    const transactions = await knex("transactions")
      .select("transactions.*", "users.user_name", "users.avatar")
      .join("users", "transactions.user_id", "users.user_id")
      .whereBetween("transaction_date", [startDate, endDate]);
    return transactions;
  } catch (error) {
    throw error;
  }
};

const retrieveRevenueInRange = async (startDate, endDate) => {
  try {
    const result = await knex("transactions")
      .select(
        knex.raw("DATE(transaction_date) as transaction_date"),
        knex.raw("SUM(amount) as totalRevenue")
      )
      .whereBetween("transaction_date", [startDate, endDate])
      .where("transaction_code", "00")
      .groupByRaw("DATE(transaction_date)");
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  save,
  retrieveAllByUser,
  retrieveInRange,
  retrieveRevenueInRange,
};

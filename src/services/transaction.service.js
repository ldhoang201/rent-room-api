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
    amount: amount / 100,
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
      .select("*");
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

module.exports = {
  save,
  retrieveAllByUser,
};

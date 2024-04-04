const knex = require("../config/knex");

const save = async (
  user_id,
  amount,
  card_type,
  bank_code,
  transaction_info,
  transaction_code,
) => {
  await knex("transactions").insert({
    user_id: user_id,
    amount: amount,
    card_type: card_type,
    bank_code: bank_code,
    transaction_code: transaction_code,
    transaction_info: transaction_info,
  });
};

const retrieveAllbyUserId = async (user_id) => {
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

module.exports = {
  save,
  retrieveAllbyUserId,
};

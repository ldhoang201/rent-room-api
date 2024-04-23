const knex = require("../config/knex");

const save = async (fullName, email, phone, message) => {
  try {
    await knex("contact").insert({
      full_name: fullName,
      email: email,
      phone: phone,
      message: message,
    });
  } catch (error) {
    throw error;
  }
};

const retrieveAll = async () => {
  try {
    const contacts = await knex("contact").select("*");
    return contacts;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  save,
  retrieveAll,
};

const knex = require("../config/knex");

const save = async (fullName, email, phone, message) => {
  try {
    await knex("contacts").insert({
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
    const contacts = await knex("contacts").select("*");
    return contacts;
  } catch (error) {
    console.error("Error retrieving contacts:", error);
    throw new Error(error);
  }
};

module.exports = {
  save,
  retrieveAll,
};

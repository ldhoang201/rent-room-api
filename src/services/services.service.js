const knex = require("../config/knex");

const retrieveAll = async () => {
  try {
    const services = await knex("services");
    return services;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  retrieveAll,
};

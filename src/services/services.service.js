const knex = require("../config/knex");

const retrieveAll = async () => {
  try {
    const services = await knex("services");
    return services;
  } catch (error) {
    throw error;
  }
};

const retrieveById = async (serviceId) => {
  try {
    const service = await knex("services")
      .where({
        service_id: serviceId,
      })
      .first();
    return service;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  retrieveAll,
  retrieveById,
};

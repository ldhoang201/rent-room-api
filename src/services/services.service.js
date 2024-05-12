const knex = require("../config/knex");

const retrieveAll = async () => {
  try {
    const services = await knex("services").orderBy("service_id");
    return services;
  } catch (error) {
    throw error;
  }
};

const update = async (serviceId, payload) => {
  try {
    await knex("services").where({ service_id: serviceId }).update(payload);
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

const retrieveServiceNameById = async (serviceId) => {
  try {
    const service = await knex("services")
      .select("service_name")
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
  update,
  retrieveAll,
  retrieveById,
  retrieveServiceNameById,
};

const knex = require("../config/knex");

const retrieveAll = () => {
  return knex.select("*").from("roles").whereNot("role_name", "admin");
};

const retrieveNameById = (role_id) => {
  return knex.select("role_name").from("roles").where({ role_id });
};

module.exports = {
  retrieveAll,
  retrieveNameById,
};

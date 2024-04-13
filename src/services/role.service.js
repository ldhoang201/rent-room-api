const knex = require("../config/knex");

const retrieveAll = () => {
  return knex.select("*").from("roles").whereNot("role_name", "admin");
};

module.exports.retrieveAll = retrieveAll;

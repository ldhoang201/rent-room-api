const knexConfig = require("../../knexfile.js");
const knex = require("knex");

const myknex = knex(knexConfig);

module.exports = myknex;

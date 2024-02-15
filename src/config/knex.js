import knexConfig from "../../knexfile";
import knex from "knex";

const myknex = knex(knexConfig);

export default myknex;

const dotenv = require("dotenv");
dotenv.config();

console.log(process.env.DB_URL);
module.exports = {
  client: "pg",
  connection: process.env.DB_URL,
  migrations: {
    directory: `${__dirname}/src/database/migrations`,
    schemaName: "public",
    tableName: "knex_migrations",
  },
  seeds: {
    directory: `${__dirname}/src/database/seeds`,
  },
};

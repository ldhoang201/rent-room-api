const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  client: "pg",
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: `${__dirname}/src/database/migrations`,
    schemaName: "public",
    tableName: "knex_migrations",
  },
  seeds: {
    directory: `${__dirname}/src/database/seeds`,
  },
};

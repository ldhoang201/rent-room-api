const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || process.env.DB_LOCAL_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  migrations: {
    directory: `${__dirname}/src/database/migrations`,
    schemaName: "public",
    tableName: "knex_migrations",
  },
  seeds: {
    directory: `${__dirname}/src/database/seeds`,
  },
};

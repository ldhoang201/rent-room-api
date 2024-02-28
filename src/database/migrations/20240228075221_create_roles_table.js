exports.up = function (knex) {
  return knex.schema.createTable("roles", function (table) {
    table.increments("role_id").primary();
    table.string("role_name", 50).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("roles");
};

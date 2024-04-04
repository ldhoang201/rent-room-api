exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("user_id").primary();
    table.string("user_name", 50).notNullable();
    table.string("email", 50).notNullable();
    table.string("hashed_password", 255).notNullable();
    table.string("phone", 50).notNullable();
    table.integer("role_id").notNullable();
    table.string("avatar", 255);
    table.string("service", 50).defaultTo("vip4");
    table.foreign("role_id").references("role_id").inTable("roles");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};

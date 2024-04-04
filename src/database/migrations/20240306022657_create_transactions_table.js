exports.up = function (knex) {
  return knex.schema.createTable("transactions", function (table) {
    table.increments("transaction_id").primary();
    table.integer("user_id").unsigned().notNullable();
    table.foreign("user_id").references("user_id").inTable("users");
    table.integer("amount").notNullable();
    table.string("transaction_type", 100).notNullable();
    table.timestamp("transaction_date").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("transactions");
};

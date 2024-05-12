// Knex migration file
exports.up = function (knex) {
  return knex.schema.createTable("purchase_history", function (table) {
    table.increments("history_id").primary();
    table.integer("user_id").unsigned().references("user_id").inTable("users");
    table
      .integer("service_id")
      .unsigned()
      .references("service_id")
      .inTable("services");
    table.timestamp("service_expiry_date");
    table.timestamp("purchase_date").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("purchase_history");
};

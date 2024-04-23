exports.up = function (knex) {
  return knex.schema.createTable("contact", function (table) {
    table.increments("contact_id").primary();
    table.string("full_name", 50).notNullable();
    table.string("email", 50).notNullable();
    table.string("phone", 50).notNullable();
    table.text("message").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("contact");
};

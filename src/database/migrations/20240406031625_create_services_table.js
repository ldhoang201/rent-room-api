exports.up = function (knex) {
  return knex.schema.createTable("services", function (table) {
    table.increments("service_id").primary();
    table.string("service_name").notNullable();
    table.integer("price_per_day").notNullable();
    table.integer("price_per_week").notNullable();
    table.integer("price_per_month").notNullable();
    table.text("advantages");
    table.string("title_color");
    table.boolean("auto_approval").defaultTo(false);
    table.boolean("prominent_badge").defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("services");
};

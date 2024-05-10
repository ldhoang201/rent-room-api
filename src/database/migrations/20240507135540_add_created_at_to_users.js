exports.up = function (knex) {
  return knex.schema.table("users", function (table) {
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.table("users", function (table) {
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

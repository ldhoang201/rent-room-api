exports.up = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.integer("balance").defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.dropColumn("balance");
  });
};

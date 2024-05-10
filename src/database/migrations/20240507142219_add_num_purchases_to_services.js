exports.up = function (knex) {
  return knex.schema.table("services", function (table) {
    table.integer("num_purchases").defaultTo(0);
  });
};

exports.down = function (knex) {
  return knex.schema.table("services", function (table) {
    table.integer("num_purchases").defaultTo(0);
  });
};

exports.up = function (knex) {
  return knex.schema.table("services", function (table) {
    table.string("period");
  });
};

exports.down = function (knex) {
  return knex.schema.table("services", function (table) {
    table.dropColumn("period");
  });
};

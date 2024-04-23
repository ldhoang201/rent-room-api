exports.up = function (knex) {
  return knex.schema.table("viewing_requests", function (table) {
    table.string("note");
  });
};

exports.down = function (knex) {
  return knex.schema.table("viewing_requests", function (table) {
    table.dropColumn("note");
  });
};

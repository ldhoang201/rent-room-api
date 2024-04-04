exports.up = function (knex) {
  return knex.schema.table("viewing_requests", function (table) {
    table.string("time_frame").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.table("viewing_requests", function (table) {
    table.dropColumn("time_frame");
  });
};

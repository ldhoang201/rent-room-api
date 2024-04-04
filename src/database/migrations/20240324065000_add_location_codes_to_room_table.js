exports.up = function (knex) {
  return knex.schema.table("room", function (table) {
    table.specificType("location_codes", "VARCHAR[]").notNullable().defaultTo('{0,0,0}');
  });
};

exports.down = function (knex) {
  return knex.schema.table("room", function (table) {
    table.dropColumn("location_codes");
  });
};

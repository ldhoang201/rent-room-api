exports.up = function (knex) {
  return knex.schema.alterTable("room_detail", function (table) {
    table.renameColumn("square_feet", "area");
    table.string("gender").notNullable().defaultTo("M");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("room_detail", function (table) {
    table.renameColumn("area", "square_feet");
    table.dropColumn("gender");
  });
};

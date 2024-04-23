exports.up = function (knex) {
  return knex.schema.table("posts", function (table) {
    table.boolean("is_blocked").notNullable().defaultTo(false);
    table.boolean("available").notNullable().defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.table("posts", function (table) {
    table.dropColumn("is_blocked");
    table.dropColumn("available");
  });
};

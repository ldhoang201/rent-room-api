exports.up = function (knex) {
  return knex.schema.table("posts", function (table) {
    table.boolean("delete_flag").notNullable().defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.table("posts", function (table) {
    table.dropColumn("delete_flag");
  });
};

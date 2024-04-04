exports.up = function (knex) {
  return knex.schema.table("posts", function (table) {
    table.boolean("is_approved").notNullable().defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.table("posts", function (table) {
    table.dropColumn("is_approved");
  });
};

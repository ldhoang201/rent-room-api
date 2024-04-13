exports.up = function (knex) {
  return knex.schema.table("viewing_requests", function (table) {
    table.boolean("is_approved").notNullable().defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.table("viewing_requests", function (table) {
    table.dropColumn("is_approved");
  });
};

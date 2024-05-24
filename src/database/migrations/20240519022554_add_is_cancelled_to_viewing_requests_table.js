exports.up = function (knex) {
  return knex.schema.table("viewing_requests", function (table) {
    table.boolean("is_cancelled").notNullable().defaultTo(false);
    table.string("cancelled_reason").nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.table("viewing_requests", function (table) {
    table.dropColumn("cancelled_reason");
    table.dropColumn("is_cancelled");
  });
};

exports.up = function (knex) {
  return knex.schema.table("users", function (table) {
    table.boolean("is_blocked").notNullable().defaultTo(false);
    table.timestamp("service_expiry_date");
  });
};

exports.down = function (knex) {
  return knex.schema.table("users", function (table) {
    table.dropColumn("is_blocked");
    table.dropColumn("service_expiry_date");
  });
};

exports.up = function (knex) {
  return knex.schema.table("transactions", function (table) {
    table.dropColumn("card_type");
    table.dropColumn("bank_code");
    table.string("status").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.table("transactions", function (table) {
    table.string("card_type");
    table.string("bank_code");
    table.dropColumn("status");
  });
};

exports.up = function (knex) {
  return knex.schema.table("transactions", function (table) {
    table.string("card_type", 100);
    table.string("bank_code", 100);
    table.string("transaction_code", 100);
    table.string("transaction_info", 255);
    table.dropColumn("transaction_type");
  });
};

exports.down = function (knex) {
  return knex.schema.table("transactions", function (table) {
    table.string("transaction_type", 100).notNullable();
    table.dropColumn("card_type");
    table.dropColumn("bank_code");
    table.dropColumn("transaction_code");
    table.dropColumn("transaction_info");
  });
};

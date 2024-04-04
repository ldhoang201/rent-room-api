exports.up = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.string("avatar", 255).nullable().alter();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("users", function (table) {
    table.string("avatar", 255).notNullable().alter();
  });
};

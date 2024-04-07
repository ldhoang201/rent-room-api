exports.up = function (knex) {
  return knex.schema.table("room", function (table) {
    table.dropColumn("available");
  });
};

exports.down = function (knex) {};

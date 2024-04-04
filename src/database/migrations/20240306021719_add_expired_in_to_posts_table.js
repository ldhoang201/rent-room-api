exports.up = function (knex) {
    return knex.schema.alterTable("posts", function (table) {
      table.date("expired_in");
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.alterTable("posts", function (table) {
      table.dropColumn("expired_in");
    });
  };
  
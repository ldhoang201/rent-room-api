exports.up = function (knex) {
    return knex.schema.alterTable("users", function (table) {
      table.dropColumn("service");
      table.integer("service_id").unsigned().notNullable().defaultTo(4);
      table.foreign("service_id").references("service_id").inTable("services");
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.alterTable("users", function (table) {
      table.dropForeign("service_id");
      table.dropColumn("service_id");
      table.string("service", 50).defaultTo("vip4");
    });
  };
  
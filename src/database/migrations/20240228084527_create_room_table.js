exports.up = function (knex) {
    return knex.schema.createTable("room", function (table) {
      table.increments("room_id").primary();
      table.string("title", 255).notNullable();
      table.text("description");
      table.integer("price").notNullable();
      table.string("location", 255).notNullable();
      table.boolean("available").notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("room");
  };
  
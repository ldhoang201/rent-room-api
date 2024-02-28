exports.up = function (knex) {
  return knex.schema.createTable("favorites", function (table) {
    table.increments("favorite_id").primary();
    table.integer("user_id").notNullable();
    table.integer("room_id").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.foreign("user_id").references("user_id").inTable("users");
    table.foreign("room_id").references("room_id").inTable("room");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("favorites");
};

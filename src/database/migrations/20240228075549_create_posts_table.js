exports.up = function (knex) {
  return knex.schema.createTable("posts", function (table) {
    table.string("post_id", 50).primary();
    table.integer("room_id").notNullable();
    table.integer("user_id").notNullable();
    table.integer("post_type_id").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.foreign("room_id").references("room_id").inTable("room");
    table.foreign("user_id").references("user_id").inTable("users");
    table
      .foreign("post_type_id")
      .references("post_type_id")
      .inTable("post_type");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("posts");
};

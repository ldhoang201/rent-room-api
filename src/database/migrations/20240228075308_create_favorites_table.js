exports.up = function (knex) {
  return knex.schema.createTable("favorites", function (table) {
    table.increments("favorite_id").primary();
    table.integer("user_id").notNullable();
    table.string("post_id",50).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.foreign("user_id").references("user_id").inTable("users");
    table.foreign("post_id").references("post_id").inTable("posts");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("favorites");
};

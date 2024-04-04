exports.up = function (knex) {
  return knex.schema.createTable("comments", function (table) {
    table.increments("comment_id").primary();
    table.string("post_id", 50).notNullable();
    table.text("content").notNullable();
    table.float("rating").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.foreign("post_id").references("post_id").inTable("posts");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("comments");
};

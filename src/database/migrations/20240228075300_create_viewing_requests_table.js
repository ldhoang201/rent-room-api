exports.up = function (knex) {
  return knex.schema.createTable("viewing_requests", function (table) {
    table.increments("request_id").primary();
    table.string("post_id",50).notNullable();
    table.date("request_date").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.foreign("post_id").references("post_id").inTable("posts");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("viewing_requests");
};

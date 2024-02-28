exports.up = function (knex) {
  return knex.schema.createTable("post_type", function (table) {
    table.increments("post_type_id").primary();
    table.string("post_type_name", 50).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("post_type");
};

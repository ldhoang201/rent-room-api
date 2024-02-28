exports.up = function (knex) {
  return knex.schema.createTable("amenities", function (table) {
    table.increments("amenities_id").primary();
    table.string("amenity_name", 255).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("amenities");
};

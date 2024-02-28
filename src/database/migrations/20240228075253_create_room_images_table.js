exports.up = function (knex) {
  return knex.schema.createTable("room_images", function (table) {
    table.increments("room_images_id").primary();
    table.integer("room_id").notNullable();
    table.string("image_url", 255).notNullable();
    table.foreign("room_id").references("room_id").inTable("room");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("room_images");
};

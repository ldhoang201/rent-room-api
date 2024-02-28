exports.up = function (knex) {
  return knex.schema.createTable("room_detail", function (table) {
    table.increments("room_detail_id").primary();
    table.integer("room_id").notNullable();
    table.integer("room_type_id").notNullable();
    table.integer("capacity").notNullable();
    table.integer("square_feet").notNullable();
    table.foreign("room_id").references("room_id").inTable("room");
    table
      .foreign("room_type_id")
      .references("room_type_id")
      .inTable("room_type");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("room_detail");
};

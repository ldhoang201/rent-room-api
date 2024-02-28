exports.up = function(knex) {
  return knex.schema.createTable('rooms_amenities', function(table) {
    table.increments('rooms_amenities_id').primary();
    table.integer('amenities_id').notNullable();
    table.integer('room_id').notNullable();

    table.foreign('room_id').references('room_id').inTable('room');
    table.foreign('amenities_id').references('amenities_id').inTable('amenities');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('rooms_amenities');
};

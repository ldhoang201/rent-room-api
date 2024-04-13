exports.up = function(knex) {
    return knex.schema.renameTable('rooms_amenities', 'room_amenities');
  };
  
  exports.down = function(knex) {
    return knex.schema.renameTable('room_amenities', 'rooms_amenities');
  };
  
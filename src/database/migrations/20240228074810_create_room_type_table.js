exports.up = function(knex) {
    return knex.schema.createTable('room_type', function(table) {
      table.increments('room_type_id').primary();
      table.string('room_type_name', 50).notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('room_type');
  };
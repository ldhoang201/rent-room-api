exports.up = function(knex) {
    return knex.schema.table('viewing_requests', function(table) {
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('user_id').inTable('users');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('viewing_requests', function(table) {
      table.dropForeign('user_id');
      table.dropColumn('user_id');
    });
  };
  
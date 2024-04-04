exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('room_type').del()
    .then(function () {
      // Inserts seed entries
      return knex('room_type').insert([
        { room_type_id: 1, room_type_name: 'Cho thuê nguyên căn' },
        { room_type_id: 2, room_type_name: 'Phòng trọ' },
        { room_type_id: 3, room_type_name: 'Căn hộ mini' },
        { room_type_id: 4, room_type_name: 'Homestay' }
      ]);
    });
};

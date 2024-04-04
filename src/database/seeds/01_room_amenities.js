exports.seed = function(knex) {
  return knex('rooms_amenities').del()
    .then(function () {
      return knex('rooms_amenities').insert([
        { amenities_id: 1, room_id: 1 },
        { amenities_id: 2, room_id: 1 },
        { amenities_id: 3, room_id: 1 },
        { amenities_id: 4, room_id: 2 },
        { amenities_id: 5, room_id: 2 },
        { amenities_id: 6, room_id: 2 },
        { amenities_id: 1, room_id: 3 },
        { amenities_id: 2, room_id: 3 },
        { amenities_id: 3, room_id: 3 },
        { amenities_id: 4, room_id: 4 },
        { amenities_id: 5, room_id: 4 },
        { amenities_id: 6, room_id: 4 }
      ]);
    });
};

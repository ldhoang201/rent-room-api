exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("room_detail")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("room_detail").insert([
        {
          room_id: 1,
          room_type_id: 1,
          capacity: 2,
          square_feet: 300,
        },
        {
          room_id: 2,
          room_type_id: 1,
          capacity: 2,
          square_feet: 350,
        },
        {
          room_id: 3,
          room_type_id: 2,
          capacity: 3,
          square_feet: 400,
        },
        {
          room_id: 4,
          room_type_id: 2,
          capacity: 3,
          square_feet: 380,
        },
      ]);
    });
};

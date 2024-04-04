const { v4: uuidv4 } = require('uuid');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("posts")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("posts").insert([
        {
          post_id: uuidv4(),
          room_id: 1,
          user_id: 4,
          post_type_id: 1,
          expired_in: knex.raw("CURRENT_DATE + INTERVAL '7 days'"),
        },
        {
          post_id: uuidv4(),
          room_id: 2,
          user_id: 4,
          post_type_id: 1,
          expired_in: knex.raw("CURRENT_DATE + INTERVAL '7 days'"),
        },
        {
          post_id: uuidv4(),
          room_id: 3,
          user_id: 5,
          post_type_id: 1,
          expired_in: knex.raw("CURRENT_DATE + INTERVAL '7 days'"),
        },
        {
          post_id: uuidv4(),
          room_id: 4,
          user_id: 5,
          post_type_id: 2,
          expired_in: knex.raw("CURRENT_DATE + INTERVAL '7 days'"),
        },
      ]);
    });
};

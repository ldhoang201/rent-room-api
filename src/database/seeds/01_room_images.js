exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("room_images")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("room_images").insert([
        {
          room_id: 1,
          image_url: "https://picsum.photos/400/300",
        },
        {
          room_id: 1,
          image_url: "https://picsum.photos/400/300",
        },
        {
          room_id: 1,
          image_url: "https://picsum.photos/400/300",
        },
        {
          room_id: 2,
          image_url: "https://picsum.photos/400/300",
        },
        {
          room_id: 2,
          image_url: "https://picsum.photos/400/300",
        },
        {
          room_id: 2,
          image_url: "https://picsum.photos/400/300",
        },
        {
          room_id: 3,
          image_url: "https://picsum.photos/400/300",
        },
        {
          room_id: 3,
          image_url: "https://picsum.photos/400/300",
        },
        {
          room_id: 3,
          image_url: "https://picsum.photos/400/300",
        },
        {
          room_id: 4,
          image_url: "https://picsum.photos/400/300",
        },
        {
          room_id: 4,
          image_url: "https://picsum.photos/400/300",
        },
        {
          room_id: 4,
          image_url: "https://picsum.photos/400/300",
        },
      ]);
    });
};

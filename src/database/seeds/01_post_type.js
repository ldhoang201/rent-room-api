exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("post_type")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("post_type").insert([
        { post_type_id: 1, post_type_name: "Cho thuê" },
        { post_type_id: 2, post_type_name: "Tìm ở ghép" },
      ]);
    });
};

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("roles")
    .del()
    .then(function () {
      return knex("roles").insert([
        { role_name: "admin" },
        { role_name: "Chủ trọ" },
        { role_name: "Người thuê" },
      ]);
    });
};

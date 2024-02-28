exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("roles")
    .del()
    .then(function () {
      return knex("roles").insert([
        { role_name: "admin" },
        { role_name: "landlord" },
        { role_name: "tenant" },
      ]);
    });
};

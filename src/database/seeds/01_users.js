exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          user_name: "Quản trị viên",
          email: "@admin",
          hashed_password:
            "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
          phone: "123456789",
          role_id: 1,
          avatar:
            "https://res.cloudinary.com/ds25tddiq/image/upload/v1713001231/images/dad26239-6735-4630-8b69-f2a54c63acd8.jpg",
        },
      ]);
    });
};

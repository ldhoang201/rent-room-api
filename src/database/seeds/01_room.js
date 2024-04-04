exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("room")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("room").insert([
        {
          title: "Phòng trọ 1",
          description: "Phòng trọ đẹp, thoáng mát",
          price: 1500000,
          location: "25 Đường Láng, Đống Đa, Hà Nội",
          available: true,
        },
        {
          title: "Phòng trọ 2",
          description: "Phòng trọ rộng rãi, view đẹp",
          price: 2000000,
          location: "Số 10 Nguyễn Huệ, Quận 1, Hồ Chí Minh",
          available: true,
        },
        {
          title: "Phòng trọ 3",
          description: "Phòng trọ gần trung tâm thành phố",
          price: 1800000,
          location: "123 Đường 2/9, Quận Hải Châu, Đà Nẵng",
          available: true,
        },
        {
          title: "Phòng trọ 4",
          description: "Phòng trọ view sông Hương",
          price: 2200000,
          location: "456 Hải Phòng, Thành phố Huế, Thừa Thiên Huế",
          available: true,
        },
      ]);
    });
};

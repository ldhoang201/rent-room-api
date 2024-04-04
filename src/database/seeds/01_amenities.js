exports.seed = function (knex) {
  return knex("amenities")
    .del()
    .then(function () {
      return knex("amenities").insert([
        { amenity_name: "Wifi" },
        { amenity_name: "Điều hòa" },
        { amenity_name: "Chỗ để xe" },
        { amenity_name: "TV" },
        { amenity_name: "Tủ lạnh" },
        { amenity_name: "Máy Giặt" },
      ]);
    });
};

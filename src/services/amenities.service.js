const knex = require("../config/knex");

const retrieveByPostId = async (postId) => {
  try {
    const amenities = await knex("amenities")
      .select(
        knex.raw("ARRAY_AGG(DISTINCT amenities.amenity_name) as amenities")
      )
      .leftJoin(
        "room_amenities",
        "amenities.amenity_id",
        "room_amenities.amenity_id"
      )
      .leftJoin("posts", "room_amenities.room_id", "posts.room_id")
      .where("posts.post_id", postId)
      .groupBy("posts.post_id");
    return amenities[0].amenities;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const retrieveAmenityIds = async (amenityNames) => {
  try {
    const ids = await knex("amenities")
      .whereIn("amenity_name", amenityNames)
      .pluck("amenity_id");
    return ids;
  } catch (error) {
    console.error("Error fetching amenity IDs:", error);
    throw error;
  }
};

const retrieveAll = async () => {
  try {
    const amenities = await knex("amenities")
      .select(
        knex.raw("ARRAY_AGG(DISTINCT amenities.amenity_name) as amenities")
      )
      .leftJoin(
        "room_amenities",
        "amenities.amenity_id",
        "room_amenities.amenity_id"
      )
      .leftJoin("posts", "room_amenities.room_id", "posts.room_id")
      .groupBy("posts.post_id");
    return amenities[0];
  } catch (error) {
    throw error;
  }
};

const retrieveAllType = async () => {
  const amenities = await knex("amenities");
  return amenities;
};

const saveAmenities = async (amenities) => {
  let amenity_ids = await Promise.all(
    amenities.map(async (amenity) => {
      let [amenity_id] = await knex("amenities")
        .insert({ amenity_name: amenity.amenity_name })
        .returning("amenity_id");
      return amenity_id;
    })
  );
  return amenity_ids;
};

const save = async (amenitiesIds, roomId) => {
  try {
    await knex("room_amenities").del().where("room_id", roomId);
    const result = await knex("room_amenities").insert(
      amenitiesIds.map((amenityId) => ({
        room_id: roomId,
        amenity_id: amenityId,
      }))
    );
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  retrieveByPostId,
  retrieveAll,
  retrieveAllType,
  retrieveAmenityIds,
  saveAmenities,
  save,
};

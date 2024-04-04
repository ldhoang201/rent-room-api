const knex = require("../config/knex");

const retrieveByPostId = async (postId) => {
  try {
    const amenities = await knex("amenities")
      .select(
        knex.raw("ARRAY_AGG(DISTINCT amenities.amenity_name) as amenities")
      )
      .leftJoin(
        "rooms_amenities",
        "amenities.amenities_id",
        "rooms_amenities.amenities_id"
      )
      .leftJoin("posts", "rooms_amenities.room_id", "posts.room_id")
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
      .pluck("amenities_id");
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
        "rooms_amenities",
        "amenities.amenities_id",
        "rooms_amenities.amenities_id"
      )
      .leftJoin("posts", "rooms_amenities.room_id", "posts.room_id")
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

const save = async (amenitiesIds, roomId) => {
  try {
    await knex("rooms_amenities").del().where("room_id", roomId);
    const result = await knex("rooms_amenities").insert(
      amenitiesIds.map((amenityId) => ({
        room_id: roomId,
        amenities_id: amenityId,
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
  save,
};

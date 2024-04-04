const knex = require("../config/knex");

const retrieveByPostId = async (postId) => {
  try {
    const images = await knex("room_images")
      .select(knex.raw("ARRAY_AGG(DISTINCT room_images.image_url) as images"))
      .leftJoin("posts", "posts.room_id", "room_images.room_id")
      .where("posts.post_id", postId)
      .groupBy("posts.post_id");
    return images[0].images;
  } catch (error) {
    throw error;
  }
};

const retrieveAll = async () => {
  try {
    const images = await knex("room_images")
      .select("posts.post_id")
      .select(knex.raw("ARRAY_AGG(DISTINCT room_images.image_url) as images"))
      .leftJoin("posts", "posts.room_id", "room_images.room_id")
      .groupBy("posts.post_id");
    return images;
  } catch (error) {
    throw error;
  }
};

const save = async (imageUrls, roomId) => {
  try {
    await knex("room_images").del().where("room_id", roomId);
    const result = await knex("room_images").insert(
      imageUrls.map((imageUrl) => ({
        room_id: roomId,
        image_url: imageUrl,
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
  save,
};

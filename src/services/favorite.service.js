const knex = require("../config/knex");
const postService = require("../services/post.service");

const save = async (favoriteData) => {
  try {
    const favoriteId = await knex("favorites").insert(favoriteData);
    return favoriteId;
  } catch (error) {
    throw error;
  }
};

const retrieveByUser = async (userId) => {
  try {
    const favorites = await knex("favorites").where("user_id", userId);
    const postIds = favorites.map((fav) => fav.post_id);
    const allPosts = await postService.retrieveAll();

    const favoritePosts = allPosts.filter((post) => {
      return postIds.includes(post.post_id);
    });
    return favoritePosts;
  } catch (error) {
    throw error;
  }
};

const retrieveByPost = async (userId, postId) => {
  try {
    const favorites = await knex("favorites").where({
      user_id: userId,
      post_id: postId,
    });
    return favorites[0];
  } catch (error) {
    throw error;
  }
};

const remove = async (postId, userId) => {
  try {
    await knex("favorites").where({ post_id: postId, user_id: userId }).del();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  save,
  remove,
  retrieveByUser,
  retrieveByPost,
};

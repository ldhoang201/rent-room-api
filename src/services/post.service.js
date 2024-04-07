const knex = require("../config/knex");
const amenitieService = require("../services/amenities.service");
const roomImageService = require("../services/room-image.service");
const roomService = require("../services/room.service");

const retrieveTypeList = () => {
  return knex.select("*").from("post_type");
};

const retrievePosts = async () => {
  try {
    const posts = await knex("posts")
      .select(
        "posts.*",
        "room.*",
        "post_type.post_type_name",
        "room_type.room_type_name",
        "room_detail.room_type_id",
        "room_detail.area",
        "room_detail.capacity",
        "room_detail.area",
        "room_detail.gender",
        "users.user_name",
        "users.avatar",
        "users.phone"
      )
      .modify(function (qb) {
        qb.leftJoin("room", "posts.room_id", "room.room_id")
          .leftJoin("users", "posts.user_id", "users.user_id")
          .leftJoin("post_type", "posts.post_type_id", "post_type.post_type_id")
          .leftJoin("room_detail", "room.room_id", "room_detail.room_id")
          .leftJoin(
            "room_type",
            "room_detail.room_type_id",
            "room_type.room_type_id"
          )
          .groupBy(
            "room_detail.area",
            "room_detail.capacity",
            "room_detail.gender",
            "users.user_name",
            "users.avatar",
            "users.phone",
            "room.room_id",
            "post_type.post_type_name",
            "room_type.room_type_name",
            "room_detail.room_type_id",
            "posts.post_id",
            "posts.room_id"
          );
      });
    return posts;
  } catch (error) {
    throw error;
  }
};

const retrieveAll = async () => {
  try {
    const posts = await retrievePosts();
    const images = await roomImageService.retrieveAll();
    posts.forEach((post) => {
      post.images = images.find((img) => img.post_id === post.post_id).images;
    });
    return posts;
  } catch (error) {
    throw error;
  }
};

const retrieveById = async (postId) => {
  try {
    const posts = await retrievePosts();
    const post = posts.find((post) => post.post_id === postId);
    post.amenities = await amenitieService.retrieveByPostId(postId);
    post.images = await roomImageService.retrieveByPostId(postId);
    return post;
  } catch (error) {
    throw error;
  }
};

const retrieveByUser = async (userId) => {
  try {
    const allPosts = await retrievePosts();
    const posts = allPosts.filter((post) => {
      return post.user_id === parseInt(userId);
    });
    const images = await roomImageService.retrieveAll();
    posts.forEach((post) => {
      post.images = images.find((img) => img.post_id === post.post_id).images;
    });
    return posts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const retrieveLatest = async () => {
  try {
    const posts = await knex("posts")
      .select(
        "posts.post_id",
        "posts.user_id",
        "posts.created_at",
        "room.title",
        "room.price"
      )
      .modify(function (qb) {
        qb.leftJoin("room", "posts.room_id", "room.room_id")
          .orderBy("posts.created_at", "desc")
          .limit(3);
      });
    const images = await roomImageService.retrieveAll();
    posts.forEach((post) => {
      post.images = images.find((img) => img.post_id === post.post_id).images;
    });
    return posts;
  } catch (error) {
    throw error;
  }
};

const retrieveByCriteria = async (criteria) => {
  try {
    console.log(criteria);
    const allPosts = await retrievePosts();
    const images = await roomImageService.retrieveAll();
    const roomIds = await roomService.retrieveByCriteria(criteria);
    const filteredPosts = allPosts
      .filter((post) => roomIds.includes(post.room_id))
      .filter(
        (post) =>
          !criteria.post_type_id || post.post_type_id == criteria.post_type_id
      )
      .map((post) => {
        const postImages = images.find((img) => img.post_id === post.post_id);
        return {
          ...post,
          images: postImages ? postImages.images : [],
        };
      });

    return filteredPosts;
  } catch (error) {
    throw error;
  }
};

const save = async (postData) => {
  try {
    const postId = await knex("posts").insert(postData);
    return postId;
  } catch (error) {
    throw error;
  }
};

const update = async (updatedData, postId) => {
  try {
    await knex("posts").where("post_id", postId).update(updatedData);
  } catch (error) {
    throw error;
  }
};

const remove = async (postId) => {
  try {
    await knex("posts").where("post_id", postId).del();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  retrieveTypeList,
  retrieveById,
  retrieveAll,
  retrieveByUser,
  retrieveByCriteria,
  retrieveLatest,
  update,
  save,
  remove,
};

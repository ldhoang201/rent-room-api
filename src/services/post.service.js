const knex = require("../config/knex");
const amenitieService = require("../services/amenities.service");
const roomImageService = require("../services/room-image.service");
const roomService = require("../services/room.service");
const userService = require("../services/user.service");
const serviceService = require("../services/services.service");
const moment = require("moment");

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
        "room_detail.price",
        "users.user_name",
        "users.avatar",
        "users.phone",
        "users.service_id"
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
          // .where("posts.delete_flag", false)
          // .where("posts.available", true)
          // .where("posts.is_blocked", false)
          // .where("posts.is_approved", true)
          .groupBy(
            "room_detail.price",
            "room_detail.area",
            "room_detail.capacity",
            "room_detail.gender",
            "users.user_name",
            "users.avatar",
            "users.phone",
            "users.service_id",
            "room.room_id",
            "post_type.post_type_name",
            "room_type.room_type_name",
            "room_detail.room_type_id",
            "posts.post_id",
            "posts.room_id"
          )
          .orderBy("users.service_id", "asc");
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
        "room_detail.price"
      )
      .modify(function (qb) {
        qb.leftJoin("room", "posts.room_id", "room.room_id")
          .leftJoin("room_detail", "posts.room_id", "room_detail.room_id")
          // .where("posts.delete_flag", false)
          // .where("posts.available", true)
          // .where("posts.is_blocked", false)
          // .where("posts.is_approved", true)
          .orderBy("posts.created_at", "desc")
          .limit(10);
      });
    const images = await roomImageService.retrieveAll();
    posts.forEach((post) => {
      const postImages = images.find((img) => img.post_id === post.post_id);
      post.images = postImages ? postImages.images : [];
    });
    return posts;
  } catch (error) {
    throw error;
  }
};

const retrieveHottest = async () => {
  try {
    const posts = await knex("posts")
      .select(
        "posts.post_id",
        "posts.user_id",
        "posts.created_at",
        "users.service_id",
        "room.title",
        "room_detail.price"
      )
      .modify(function (qb) {
        qb.leftJoin("room", "posts.room_id", "room.room_id")
          .leftJoin("room_detail", "posts.room_id", "room_detail.room_id")
          .leftJoin("users", "posts.user_id", "users.user_id")
          // .where("posts.delete_flag", false)
          // .where("posts.available", true)
          // .where("posts.is_blocked", false)
          // .where("posts.is_approved", true)
          .orderBy("users.service_id", "asc")
          .limit(10);
      });
    const images = await roomImageService.retrieveAll();
    posts.forEach((post) => {
      const postImages = images.find((img) => img.post_id === post.post_id);
      post.images = postImages ? postImages.images : []; // Thêm check để tránh lỗi nếu không có ảnh nào khớp
    });
    return posts;
  } catch (error) {
    throw error;
  }
};

const updateApprovedStatus = async (postId, isApproved) => {
  try {
    const post = await knex("posts").where("post_id", postId).first();
    if (!post) {
      throw new Error("Post not found");
    }

    const service = await serviceService.retrieveById(
      await userService.retrieveService(post.user_id)
    );

    if (isApproved) {
      const periodParts = service.period.split(" ");
      const duration = parseInt(periodParts[0]);
      const unit = periodParts[1];
      const expirationDate = moment().add(duration, unit);

      await knex("posts")
        .where("post_id", postId)
        .update({ expired_in: expirationDate });
    }

    await knex("posts")
      .where("post_id", postId)
      .update({ is_approved: isApproved });

    console.log("Post status updated successfully");
  } catch (error) {
    throw error;
  }
};

const updateBlockedStatus = async (postId, isBlocked) => {
  try {
    const post = await knex("posts").where("post_id", postId).first();
    if (!post) {
      throw new Error("Post not found");
    }

    await knex("posts")
      .where("post_id", postId)
      .update({ is_blocked: isBlocked });

    console.log("Post status updated successfully");
  } catch (error) {
    throw error;
  }
};

const updateRange = async (postId, dateRange = null, timeFrames = null) => {
  try {
    const updateData = {};
    if (dateRange !== null) {
      updateData.date_range = dateRange;
    }
    if (timeFrames !== null) {
      updateData.time_frame = timeFrames;
    }

    if (Object.keys(updateData).length === 0) {
      throw new Error("Nothing to update");
    }

    await knex("posts").where({ post_id: postId }).update(updateData);

    console.log(`Post with ID ${postId} updated successfully.`);
  } catch (error) {
    console.error(`Error updating post with ID ${postId}:`, error);
    throw error;
  }
};

const retrieveByCriteria = async (criteria) => {
  try {
    const allPosts = await retrievePosts();
    const images = await roomImageService.retrieveAll();
    const roomIds = await roomService.retrieveByCriteria(criteria);

    let filteredPosts = roomIds
      .map((roomId) => {
        const post = allPosts.find((post) => post.room_id === roomId);
        if (!post) return null;

        const postImages = images.find((img) => img.post_id === post.post_id);
        return {
          ...post,
          images: postImages ? postImages.images : [],
        };
      })
      .filter((post) => post !== null)
      .filter(
        (post) =>
          !criteria.post_type_id || post.post_type_id == criteria.post_type_id
      );

    if (criteria.sort_type && criteria.sort_type === "latest") {
      filteredPosts.sort((a, b) =>
        moment(b.created_at).diff(moment(a.created_at))
      );
    }
    if (
      criteria.sort_type !== "latest" &&
      criteria.sort_type !== "price" &&
      criteria.sort_type !== "area"
    ) {
      filteredPosts.sort((a, b) => a.service_id - b.service_id);
    }

    return filteredPosts;
  } catch (error) {
    throw error;
  }
};

const retrieveByArea = async (areaCodes) => {
  try {
    const allPosts = await retrievePosts();
    const images = await roomImageService.retrieveAll();
    const roomIds = await roomService.retrieveByArea(areaCodes);
    const filteredPosts = allPosts
      .filter((post) => roomIds.includes(post.room_id))
      .map((post) => {
        const postImages = images.find((img) => img.post_id === post.post_id);
        return {
          ...post,
          images: postImages ? postImages.images : [],
        };
      });

    return roomIds.length > 0 ? filteredPosts : [];
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
    await knex("posts").where("post_id", postId).update({
      delete_flag: true,
    });
  } catch (error) {
    throw error;
  }
};

const countTotal = async () => {
  const result = await knex("posts").count("* as total");
  const total = result[0].total;
  return total;
};

module.exports = {
  retrieveTypeList,
  retrieveById,
  retrieveAll,
  retrieveByUser,
  retrieveByCriteria,
  retrieveLatest,
  retrieveHottest,
  retrieveByArea,
  updateApprovedStatus,
  updateBlockedStatus,
  updateRange,
  update,
  save,
  remove,
  countTotal,
};

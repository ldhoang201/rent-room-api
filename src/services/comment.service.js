const knex = require("../config/knex");

async function save(commentData) {
  try {
    const commentId = await knex("comments").insert(commentData);
    return commentId;
  } catch (error) {
    throw error;
  }
}

async function retrieveByPostId(postId) {
  try {
    const comments = await knex("comments")
      .select("comments.*", "users.user_name", "users.avatar")
      .leftJoin("users", "users.user_id", "comments.user_id")
      .where("comments.post_id", postId)
      .orderBy("comments.created_at","desc");
    return comments;
  } catch (error) {
    throw error;
  }
}

async function update(commentId, updatedData) {
  try {
    await knex("comments").where("comment_id", commentId).update(updatedData);
  } catch (error) {
    throw error;
  }
}

async function remove(commentId) {
  try {
    await knex("comments").where("comment_id", commentId).del();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  save,
  update,
  remove,
  retrieveByPostId,
};

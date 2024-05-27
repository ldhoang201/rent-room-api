const knex = require("../config/knex");

const save = async (postId, userId, requestDate, timeFrame, note) => {
  // const existingRequest = await checkExistingRequest(requestDate, timeFrame);

  // if (existingRequest) {
  //   return "Time frame already exists.";
  // }

  await knex("viewing_requests").insert({
    post_id: postId,
    user_id: userId,
    request_date: requestDate,
    time_frame: timeFrame,
    note: note,
  });
};

const checkExistingRequest = async (requestDate, timeFrame) => {
  return await knex("viewing_requests").where({
    request_date: requestDate,
    time_frame: timeFrame,
  });
};

const retrieveByPost = async (userId, postId) => {
  const vr = await knex("viewing_requests").where({
    user_id: userId,
    post_id: postId,
  });
  return vr[0];
};

const retrieveByUser = async (userId) => {
  const vr = await knex("viewing_requests")
    .join("posts", "viewing_requests.post_id", "posts.post_id")
    .join("users", "posts.user_id", "users.user_id")
    .select(
      "viewing_requests.*",
      "posts.user_id as post_user_id",
      "users.user_name",
      "users.avatar"
    )
    .where("viewing_requests.user_id", userId);
  return vr;
};

const retrieveAllForLandlord = async (userId) => {
  try {
    const requests = await knex("viewing_requests")
      .join("posts", "viewing_requests.post_id", "posts.post_id")
      .join("users", "users.user_id", "viewing_requests.user_id")
      .select(
        "viewing_requests.*",
        "users.user_name",
        "users.phone",
        "users.email",
        "users.avatar"
      )
      .where("posts.user_id", userId);
    return requests;
  } catch (error) {
    console.error("Error retrieving requests for landlord:", error);
    throw error;
  }
};

const approveRequest = async (requestId) => {
  try {
    return await knex("viewing_requests")
      .update("is_approved", true)
      .where({ request_id: requestId });
  } catch (error) {
    throw error;
  }
};

const cancelRequest = async (requestId, reason) => {
  try {
    return await knex("viewing_requests")
      .update("is_cancelled", true)
      .update("cancelled_reason", reason)
      .where({ request_id: requestId });
  } catch (error) {
    throw error;
  }
};

const update = async (requestId, newRequestDate, newTimeFrame, newNote) => {
  await knex("viewing_requests")
    .where("request_id", requestId)
    .update({
      request_date: newRequestDate,
      time_frame: newTimeFrame,
      note: newNote,
    });
};

const remove = async (requestId) => {
  await knex("viewing_requests").where("request_id", requestId).del();
};

module.exports = {
  save,
  retrieveByPost,
  retrieveAllForLandlord,
  approveRequest,
  retrieveByUser,
  cancelRequest,
  update,
  remove,
};

const knex = require("../config/knex");

const save = async (postId, userId, requestDate, timeFrame) => {
  // const existingRequest = await checkExistingRequest(requestDate, timeFrame);

  // if (existingRequest) {
  //   return "Time frame already exists.";
  // }

  await knex("viewing_requests").insert({
    post_id: postId,
    user_id: userId,
    request_date: requestDate,
    time_frame: timeFrame,
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

const update = async (requestId, newRequestDate, newTimeFrame) => {
  await knex("viewing_requests")
    .where("request_id", requestId)
    .update({ request_date: newRequestDate, time_frame: newTimeFrame });
};

const remove = async (requestId) => {
  await knex("viewing_requests").where("request_id", requestId).del();
};

module.exports = {
  save,
  retrieveByPost,
  update,
  remove,
};

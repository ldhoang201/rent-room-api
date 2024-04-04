const {
  save,
  update,
  retrieveByPost,
  remove,
} = require("../services/viewing-request.service");

const createRequest = async (req, res, next) => {
  try {
    const { postId, userId, requestDate, timeFrame } = req.body;
    await save(postId, userId, requestDate, timeFrame);
    res.json({ success: true, message: "Request saved successfully" });
  } catch (error) {
    next(error);
  }
};

const getRequestByPost = async (req, res, next) => {
  try {
    const { user_id, post_id } = req.body;
    const response = await retrieveByPost(user_id, post_id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const updateRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { newRequestDate, newTimeFrame } = req.body;
    await update(id, newRequestDate, newTimeFrame);
    res.json({ success: true, message: "Request updated successfully" });
  } catch (error) {
    next(error);
  }
};

const deleteRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    await remove(id);
    res.json({ success: true, message: "Request removed successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRequest,
  getRequestByPost,
  updateRequest,
  deleteRequest,
};

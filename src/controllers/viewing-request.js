const {
  save,
  update,
  approveRequest,
  retrieveByPost,
  retrieveAllForLandlord,
  remove,
} = require("../services/viewing-request.service");

const {
  sendViewRequestConfirm,
  sendAcceptedRequest,
} = require("../services/auth/otp.service");

const createRequest = async (req, res, next) => {
  try {
    const { postId, userId, requestDate, timeFrame, note } = req.body;
    await save(postId, userId, requestDate, timeFrame, note);
    res.json({ success: true, message: "Request saved successfully" });
  } catch (error) {
    next(error);
  }
};

const sendMailConfirmRequest = async (req, res, next) => {
  try {
    const { postId, email, requestDate, timeFrame, note } = req.body;
    let payload = { postId, requestDate, timeFrame, note };
    await sendViewRequestConfirm(email, payload);
    res.json({ success: true, message: "Request sent successfully" });
  } catch (error) {
    next(error);
  }
};

const sendMailAcceptedRequest = async (req, res, next) => {
  try {
    const { postId, email, requestDate, timeFrame, note } = req.body;
    let payload = { postId, requestDate, timeFrame, note };
    await sendAcceptedRequest(email, payload);
    res.json({ success: true, message: "Request sent successfully" });
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

const getAllRequestForLandlord = async (req, res, next) => {
  try {
    const { user_id } = req.body;
    const response = await retrieveAllForLandlord(user_id);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const updateRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { requestDate, timeFrame, type } = req.body;
    if (type) {
      await approveRequest(id, type);
    } else {
      await update(id, requestDate, timeFrame);
    }
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
  getAllRequestForLandlord,
  sendMailConfirmRequest,
  sendMailAcceptedRequest,
};

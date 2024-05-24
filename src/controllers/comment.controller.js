const {
  save,
  remove,
  update,
  retrieveByPostId,
} = require("../services/comment.service");

const createComment = async (req, res, next) => {
  try {
    const payload = req.body;
    const commentData = payload;
    await save(commentData);
    res.json({ message: "Create success" });
  } catch (error) {
    next(error);
  }
};

const getCommentsByPostId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comments = await retrieveByPostId(id);
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content, rating } = req.body;
    const updateData = { rating, content };
    await update(id, updateData);
    res.json({ message: "Update success" });
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    await remove(id);
    res.json({ message: "delete success" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createComment,
  getCommentsByPostId,
  updateComment,
  deleteComment,
};

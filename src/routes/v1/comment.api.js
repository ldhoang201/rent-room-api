const express = require("express");
const {
  createComment,
  updateComment,
  getCommentsByPostId,
  deleteComment,
} = require("../../controllers/comment.controller");

const {verifyToken} = require("../../middlewares/validateToken")

const router = express.Router();

router.get("/comments/:id", getCommentsByPostId);
router.post("/comments", createComment);
router.put("/comments/:id", updateComment);
router.delete("/comments/:id", deleteComment);

module.exports = router;

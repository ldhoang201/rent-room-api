const express = require("express");
const {
  getAllPost,
  getPostById,
  getPostByUser,
  getPostByCriteria,
  getLatestPost,
  getHottestPost,
  getPostTypeList,
  getPostByQuery,
  getPostByArea,
  updatePostApprovedStatus,
  createPost,
  updatePost,
  updatePostBlockedStatus,
  deletePost,
  getTotalPosts,
  updatePostRange,
} = require("../../controllers/post.controller");

const { verifyToken } = require("../../middlewares/validateToken");

const router = express.Router();

// router.use(verifyToken);

router.get("/posts", getAllPost);
router.get("/posts/count/total", getTotalPosts);
router.get("/posts/:id", getPostById);
router.get("/posts/by-user/:id", getPostByUser);
router.get("/posts/criteria/latest", getLatestPost);
router.get("/posts/criteria/hottest", getHottestPost);
router.get("/posts/type/all", getPostTypeList);
router.post("/posts", createPost);
router.post("/posts/filter-by-criteria", getPostByCriteria);
router.post("/posts/filter-by-query", getPostByQuery);
router.post("/posts/filter-by-area", getPostByArea);
router.put("/posts/:id", updatePost);
router.put('/posts/:id/range', updatePostRange);
router.put("/posts/:id/approved", updatePostApprovedStatus);
router.put("/posts/:id/blocked", updatePostBlockedStatus);
router.delete("/posts/:id", deletePost);

module.exports = router;

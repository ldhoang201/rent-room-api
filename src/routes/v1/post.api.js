const express = require("express");
const {
  getAllPost,
  getPostById,
  getPostByUser,
  getPostByCriteria,
  getLatestPost,
  getPostTypeList,
  createPost,
  updatePost,
} = require("../../controllers/post.controller");

const router = express.Router();

router.get("/posts", getAllPost);
router.get("/posts/:id", getPostById);
router.get("/posts/by-user/:id", getPostByUser);
router.get("/posts/criteria/latest", getLatestPost);
router.get("/posts/type/all", getPostTypeList);
router.post("/posts", createPost);
router.post("/posts/filter-by-criteria", getPostByCriteria);
router.put("/posts/:id", updatePost);

module.exports = router;

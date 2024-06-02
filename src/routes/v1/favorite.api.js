const express = require("express");
const {
  favorPost,
  unfavorPost,
  getFavoriteByPost,
  getFavoriteByUser,
} = require("../../controllers/favorite.controller");

const { verifyToken } = require("../../middlewares/validateToken");

const router = express.Router();

// router.use(verifyToken);

router.post("/favorites/add", favorPost);

router.post("/favorites/remove", unfavorPost);

router.post("/favorites/by-post", getFavoriteByPost);

router.post("/favorites/by-user", getFavoriteByUser);

module.exports = router;

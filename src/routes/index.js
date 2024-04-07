const express = require("express");
const userRoutes = require("./v1/user.api");
const authRoutes = require("./v1/auth/auth.api");
const uploadRoutes = require("./v1/upload-image.api");
const postRoutes = require("./v1/post.api");
const commentRoutes = require("./v1/comment.api");
const roomRoutes = require("./v1/room.api");
const amenitiesRoutes = require("./v1/amenities.api");
const viewingRequestRoutes = require("./v1/viewing-request.api");
const favoriteRoutes = require("./v1/favorite.api");
const paymentRoutes = require("./v1/payment.api");
const transactionRoutes = require("./v1/transaction.api");
const serviceRoutes = require("./v1/service.api");

const router = express.Router();

router.use(
  userRoutes,
  authRoutes,
  uploadRoutes,
  postRoutes,
  commentRoutes,
  roomRoutes,
  amenitiesRoutes,
  viewingRequestRoutes,
  favoriteRoutes,
  paymentRoutes,
  transactionRoutes,
  serviceRoutes
);

module.exports = router;

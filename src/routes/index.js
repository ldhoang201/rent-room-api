const express = require("express");
const router = express.Router();

const routes = [
  require("./v1/user.api"),
  require("./v1/auth/auth.api"),
  require("./v1/upload-image.api"),
  require("./v1/post.api"),
  require("./v1/comment.api"),
  require("./v1/room.api"),
  require("./v1/amenities.api"),
  require("./v1/viewing-request.api"),
  require("./v1/favorite.api"),
  require("./v1/payment.api"),
  require("./v1/transaction.api"),
  require("./v1/service.api"),
  require("./v1/contact.api"),
  require("./v1/chat.api"),
];

routes.forEach((route) => router.use(route));

module.exports = router;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./src/routes/v1/user.api");
const authRoutes = require("./src/routes/v1/auth/auth.api");
const uploadRoutes = require("./src/routes/v1/upload-image.api");
const postRoutes = require("./src/routes/v1/post.api");
const commentRoutes = require("./src/routes/v1/comment.api");
const roomRoutes = require("./src/routes/v1/room.api");
const amenitiesRoutes = require("./src/routes/v1/amenities.api");
const viewingRequestRoutes = require("./src/routes/v1/viewing-request.api");
const favoriteRoutes = require("./src/routes/v1/favorite.api");
const paymentRoutes = require("./src/routes/v1/payment.api");

const app = express();
const PORT = process.env.APP_LOCAL_PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use(
  "/api/v1",
  userRoutes,
  authRoutes,
  postRoutes,
  uploadRoutes,
  commentRoutes,
  roomRoutes,
  amenitiesRoutes,
  viewingRequestRoutes,
  favoriteRoutes,
  paymentRoutes
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

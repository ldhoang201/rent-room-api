const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { getImageUrl } = require("../../controllers/upload-image.controller");

router.post("/image-url", upload.single("image"), getImageUrl);

module.exports = router;

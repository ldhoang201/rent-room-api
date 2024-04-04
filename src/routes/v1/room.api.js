const express = require("express");
const { getRoomTypeList } = require("../../controllers/room.controller");

const router = express.Router();

router.get("/room/type/all", getRoomTypeList);

module.exports = router;

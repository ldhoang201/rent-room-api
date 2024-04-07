const express = require("express");
const { getAllServices } = require("../../controllers/service.controller");

const router = express.Router();

router.get("/services", getAllServices);

module.exports = router;

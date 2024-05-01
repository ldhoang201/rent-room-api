const express = require("express");
const {
  getAllServices,
  updateService,
} = require("../../controllers/service.controller");

const router = express.Router();

router.get("/services", getAllServices);
router.put("/services/:id", updateService);

module.exports = router;

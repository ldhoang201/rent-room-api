const express = require("express");
const {
  getAllAmenities,
  getAmenitiesIdsByName,
} = require("../../controllers/amenities.controller");

const router = express.Router();

router.get("/amenities/type/all", getAllAmenities);
router.post("/amenities/ids-by-name", getAmenitiesIdsByName);

module.exports = router;

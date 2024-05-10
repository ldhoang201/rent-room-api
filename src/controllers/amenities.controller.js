const {
  retrieveAllType,
  retrieveAmenityIds,
} = require("../services/amenities.service");

const getAllAmenities = async (req, res, next) => {
  try {
    const amenities = await retrieveAllType();
    res.json(amenities);
  } catch (error) {
    next(error);
  }
};

const getAmenitiesIdsByName = async (req, res, next) => {
  try {
    const amenityNames  = req.body;
    const amenitiesIds = await retrieveAmenityIds(amenityNames);
    res.json(amenitiesIds);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getAllAmenities,
  getAmenitiesIdsByName,
};

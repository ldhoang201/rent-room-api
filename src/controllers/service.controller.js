const { retrieveAll } = require("../services/services.service");

const getAllServices = async (req, res) => {
  try {
    const services = await retrieveAll();
    return res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching room types:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllServices,
};

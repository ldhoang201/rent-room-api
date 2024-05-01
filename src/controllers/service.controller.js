const { retrieveAll, update } = require("../services/services.service");

const getAllServices = async (req, res) => {
  try {
    const services = await retrieveAll();
    return res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching room types:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    await update(id, payload);
    return res.status(200).json({ message: "Update service successfully!" });
  } catch (error) {
    console.error("Error fetching room types:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllServices,
  updateService,
};

const { retrieveTypeList } = require("../services/room.service");

const getRoomTypeList = async (req, res) => {
  try {
    const roomTypes = await retrieveTypeList();
    return res.status(200).json(roomTypes);
  } catch (error) {
    console.error("Error fetching room types:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getRoomTypeList,
};

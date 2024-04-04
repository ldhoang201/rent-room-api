const { uploadImage } = require("../services/upload-image.service");

const getImageUrl = async (req, res) => {
  try {
    const { path } = req.file;
    const imageUrl = await uploadImage(path);
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getImageUrl,
};

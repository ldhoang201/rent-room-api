const { v4: uuidv4 } = require("uuid");
const { cloudConfig } = require("../config/cloudinary");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config(cloudConfig);

const uploadImage = async (image) => {
  try {
    const filename = uuidv4();

    const result = await cloudinary.uploader.upload(image, {
      public_id: `images/${filename}`,
    });

    const downloadURL = result.secure_url;

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
};

module.exports = {
  uploadImage,
};

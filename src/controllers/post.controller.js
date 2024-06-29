const postSevice = require("../services/post.service");
const roomService = require("../services/room.service");
const amenitiesService = require("../services/amenities.service");
const roomDetailService = require("../services/room-detail.service");
const roomImageService = require("../services/room-image.service");
const gptService = require("../services/gpt.service");
const { v4: uuidv4 } = require("uuid");

const getPostTypeList = async (req, res) => {
  try {
    const postTypes = await postSevice.retrieveTypeList();
    return res.status(200).json(postTypes);
  } catch (error) {
    console.error("Error fetching post types:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updatePostRange = async (req, res) => {
  const { id } = req.params;
  const { dateRange, timeFrames } = req.body;

  try {
    await postSevice.updateRange(id, dateRange, timeFrames);
    res
      .status(200)
      .json({ message: `Post with ID ${id} updated successfully.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllPost = async (req, res) => {
  try {
    const posts = await postSevice.retrieveAll();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postSevice.retrieveById(id);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getPostByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await postSevice.retrieveByUser(id);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updatePostApprovedStatus = async (req, res) => {
  const { id } = req.params;
  const { is_approved } = req.body;
  try {
    await postSevice.updateApprovedStatus(id, is_approved);
    res.json({ message: "Post approved status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updatePostBlockedStatus = async (req, res) => {
  const { id } = req.params;
  const { is_blocked } = req.body;
  try {
    await postSevice.updateBlockedStatus(id, is_blocked);
    res.json({ message: "Post blocked status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getPostByCriteria = async (req, res) => {
  try {
    const payload = req.body;

    const posts = await postSevice.retrieveByCriteria(payload);

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPostByArea = async (req, res) => {
  try {
    const { area_codes } = req.body;

    const posts = await postSevice.retrieveByArea(area_codes);

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLatestPost = async (req, res) => {
  try {
    const posts = await postSevice.retrieveLatest();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getHottestPost = async (req, res) => {
  try {
    const posts = await postSevice.retrieveHottest();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getPostByQuery = async (req, res) => {
  try {
    const { query } = req.body;
    const posts = await gptService.retrieveByUserQuery(query);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createPost = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      location,
      room_type_id,
      capacity,
      area,
      amenitiesIds,
      imageUrls,
      user_id,
      gender,
      post_type_id,
      custom_amenities,
      location_codes,
      is_approved,
      expired_in,
    } = req.body;

    let customAmenityIds = [];
    if (custom_amenities.length > 0) {
      customAmenityIds = await amenitiesService.saveAmenities(custom_amenities);
      customAmenityIds = customAmenityIds.map((obj) => obj.amenity_id);
    }
    const allAmenitiesIds = [...amenitiesIds, ...customAmenityIds];
    const post_id = uuidv4();
    const roomData = {
      title,
      description,
      location,
      location_codes,
    };
    const room = await roomService.save(roomData);
    const postData = {
      post_id,
      room_id: room.room_id,
      user_id,
      post_type_id,
      is_approved,
      expired_in,
    };
    const roomDetailData = {
      room_type_id,
      capacity,
      area,
      price,
      gender,
      room_id: room.room_id,
    };
    const promises = [
      roomDetailService.save(roomDetailData),
      amenitiesService.save(allAmenitiesIds, room.room_id),
      roomImageService.save(imageUrls, room.room_id),
      postSevice.save(postData),
    ];
    await Promise.all(promises);

    res.json({ message: "Create success" });
  } catch (error) {
    res.json({ error });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await postSevice.remove(id);
    res.json({ message: "Delete success" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      price,
      location,
      room_type_id,
      capacity,
      area,
      amenitiesIds,
      imageUrls,
      user_id,
      post_type_id,
      custom_amenities,
      gender,
      room_id,
    } = req.body;

    let customAmenityIds = [];
    if (custom_amenities.length > 0) {
      customAmenityIds = await amenitiesService.saveAmenities(custom_amenities);
      customAmenityIds = customAmenityIds.map((obj) => obj.amenity_id);
    }

    const allAmenitiesIds = [...amenitiesIds, ...customAmenityIds];

    const roomData = {
      room_id,
      title,
      description,
      location,
    };
    const postData = { room_id, user_id, post_type_id };
    const roomDetailData = {
      room_type_id,
      price,
      capacity,
      area,
      gender,
      room_id,
    };

    const promises = [
      roomService.update(roomData, room_id),
      roomDetailService.update(roomDetailData, room_id),
      amenitiesService.save(allAmenitiesIds, room_id),
      roomImageService.save(imageUrls, room_id),
      postSevice.update(postData, id),
    ];

    await Promise.all(promises);

    res.json({ message: "Update success" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getTotalPosts = async (req, res) => {
  try {
    const total = await postSevice.countTotal();
    res.json(total);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getTotalPosts,
  getAllPost,
  getPostById,
  getPostTypeList,
  getPostByUser,
  getPostByCriteria,
  updatePostApprovedStatus,
  updatePostBlockedStatus,
  getLatestPost,
  getHottestPost,
  getPostByQuery,
  createPost,
  getPostByArea,
  updatePost,
  deletePost,
  updatePostRange,
};

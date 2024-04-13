const postSevice = require("../services/post.service");
const roomService = require("../services/room.service");
const amenitiesService = require("../services/amenities.service");
const roomDetailService = require("../services/room-detail.service");
const roomImageService = require("../services/room-image.service");
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

const getPostByCriteria = async (req, res) => {
  try {
    const payload = req.body;

    const posts = await postSevice.retrieveByCriteria(payload);

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

const createPost = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      location,
      available,
      room_type_id,
      capacity,
      area,
      amenitiesIds,
      imageUrls,
      user_id,
      gender,
      post_type_id,
      location_codes,
      expired_in,
    } = req.body;
    const post_id = uuidv4();
    const roomData = {
      title,
      description,
      price,
      location,
      available,
      location_codes,
    };
    const room = await roomService.save(roomData);
    const postData = {
      post_id,
      room_id: room.room_id,
      user_id,
      post_type_id,
      expired_in,
    };
    const roomDetailData = {
      room_type_id,
      capacity,
      area,
      gender,
      room_id: room.room_id,
    };
    const promises = [
      roomDetailService.save(roomDetailData),
      amenitiesService.save(amenitiesIds, room.room_id),
      roomImageService.save(imageUrls, room.room_id),
      postSevice.save(postData),
    ];
    await Promise.all(promises);

    res.json({ message: "Create success" });
  } catch (error) {
    res.json({ error });
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
      gender,
      room_id,
    } = req.body;

    const roomData = {
      room_id,
      title,
      description,
      price,
      location,
    };
    const postData = { room_id, user_id, post_type_id };
    const roomDetailData = { room_type_id, capacity, area, gender, room_id };

    const promises = [
      roomService.update(roomData, room_id),
      roomDetailService.update(roomDetailData, room_id),
      amenitiesService.save(amenitiesIds, room_id),
      roomImageService.save(imageUrls, room_id),
      postSevice.update(postData, id),
    ];

    await Promise.all(promises);

    res.json({ message: "Update success" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  getAllPost,
  getPostById,
  getPostTypeList,
  getPostByUser,
  getPostByCriteria,
  updatePostApprovedStatus,
  getLatestPost,
  getHottestPost,
  createPost,
  updatePost,
};

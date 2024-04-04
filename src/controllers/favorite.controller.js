const {
  save,
  remove,
  retrieveByUser,
  retrieveByPost,
} = require("../services/favorite.service");

const getFavoriteByUser = async (req, res, next) => {
  try {
    const { user_id } = req.body;
    const favoritePosts = await retrieveByUser(user_id);
    res.json(favoritePosts);
  } catch (error) {
    next(error);
  }
};

const getFavoriteByPost = async (req, res, next) => {
  try {
    const { user_id, post_id } = req.body;
    const favoritePost = await retrieveByPost(user_id, post_id);
    res.json(favoritePost);
  } catch (error) {
    next(error);
  }
};

const favorPost = async (req, res, next) => {
  try {
    const { post_id, user_id } = req.body;
    const favorData = { post_id: post_id, user_id: user_id };
    await save(favorData);
    res.json({ success: true, message: "Post favored successfully" });
  } catch (error) {
    next(error);
  }
};

const unfavorPost = async (req, res, next) => {
  try {
    const { post_id, user_id } = req.body;
    await remove(post_id, user_id);
    res.json({ success: true, message: "Post favored successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFavoriteByUser,
  getFavoriteByPost,
  favorPost,
  unfavorPost,
};

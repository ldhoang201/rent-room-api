const {
  retrieveAll,
  retrieveByCriteria,
  update,
  updatePassword,
  save,
  remove,
  retrieveBalance,
  updateService,
} = require("../services/user.service");

const getAllUser = async (req, res) => {
  try {
    const users = await retrieveAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await retrieveByCriteria("user_id", userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  try {
    const newTokens = await update(userId, userData);
    res.json({ message: "User updated successfully", new_tokens: newTokens });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateUserPassword = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  try {
    await updatePassword(id, userData.password);
    res.json({ message: "User password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateUserService = async (req, res) => {
  const { id } = req.params;
  const { amount_to_sub, service_id, service_expiry_date } = req.body;
  try {
    await updateService(id, amount_to_sub, service_id, service_expiry_date);
    res.json({ message: "User password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getUserBalance = async (req, res) => {
  const userId = req.body;
  try {
    const balance = await retrieveBalance(userId);
    res.json({ message: "User saved successfully", balance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const saveUser = async (req, res) => {
  const userData = req.body;
  try {
    const userId = await save(userData);
    res.json({ message: "User saved successfully", userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    await remove(userId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllUser,
  getUserById,
  updateUser,
  saveUser,
  deleteUser,
  updateUserPassword,
  getUserBalance,
  updateUserService,
};

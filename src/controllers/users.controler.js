const {
  retrieveAll,
  retrieveByCriteria,
  retrieveById,
  update,
  updatePassword,
  updateForAdmin,
  save,
  remove,
  retrieveBalance,
  updateBlockedStatus,
  updateService,
} = require("../services/user.service");

const roleService = require("../services/role.service");

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
  const { id } = req.params;
  try {
    const user = await retrieveById(id);
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

const updateUserForAdmin = async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  try {
    await updateForAdmin(userId, userData);
    res.json({ message: "User updated successfully" });
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

const updateUserBlockedStatus = async (req, res) => {
  const { id } = req.params;
  const { is_blocked } = req.body;
  try {
    await updateBlockedStatus(id, is_blocked);
    res.json({ message: "User blocked status updated successfully" });
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

const getAllRoles = async (req, res) => {
  try {
    const roles = await roleService.retrieveAll();
    return res.status(200).json(roles);
  } catch (error) {
    console.error("Error fetching roles:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllUser,
  getUserById,
  updateUser,
  saveUser,
  deleteUser,
  updateUserPassword,
  updateUserBlockedStatus,
  getUserBalance,
  updateUserService,
  updateUserForAdmin,
  getAllRoles,
};

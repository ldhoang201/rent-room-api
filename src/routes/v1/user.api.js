const express = require("express");
const router = express.Router();
const {
  getAllUser,
  getUserById,
  updateUser,
  updateUserPassword,
  saveUser,
  deleteUser,
} = require("../../controllers/users.controler");

// const { verifyToken } = require("../../middlewares/validateToken");

router.get("/users", getAllUser);
router.get("/users/:id", getUserById);
router.post("/users/", saveUser);
router.put("/users/:id", updateUser);
router.put("/users/:id/password", updateUserPassword);
router.delete("/users/:id", deleteUser);

module.exports = router;

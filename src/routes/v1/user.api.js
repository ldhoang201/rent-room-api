const express = require("express");
const router = express.Router();
const {
  getAllUser,
  getUserById,
  updateUser,
  updateUserPassword,
  saveUser,
  deleteUser,
  updateUserService,
  updateUserBlockedStatus,
  updateUserForAdmin,
  getAllRoles,
} = require("../../controllers/users.controler");

// const { verifyToken } = require("../../middlewares/validateToken");

router.get("/users", getAllUser);
router.get("/users/:id", getUserById);
router.get("/users/roles/all", getAllRoles);
router.post("/users/", saveUser);
router.put("/users/:id", updateUser);
router.put("/users/:id/admin", updateUserForAdmin);
router.put("/users/:id/password", updateUserPassword);
router.put("/users/:id/blocked", updateUserBlockedStatus);
router.put("/users/:id/service", updateUserService);
router.delete("/users/:id", deleteUser);

module.exports = router;

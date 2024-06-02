const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userService = require("../user.service");

const generateToken = (user, expiresIn) => {
  return jwt.sign({ user }, process.env.JWT_KEY, { expiresIn });
};

const login = async (email, password) => {
  try {
    const user = await userService.retrieveByCriteria("email", email);
    if (!user) {
      return "Not Found";
    }

    const hashedPassword = sha256(password);
    console.log(hashedPassword);
    console.log(user.hashed_password);

    const passwordMatch = hashedPassword === user.hashed_password;

    if (!passwordMatch) {
      return "Invalid";
    }

    if (user.is_blocked) {
      return "Blocked";
    }

    const accessToken = generateToken(user, "1h");
    const refreshToken = generateToken(user, "7d");
    user.access_token = accessToken;
    user.refresh_token = refreshToken;

    return { user };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const signUp = async (userData) => {
  try {
    const { email } = userData;
    const existingUser = await userService.retrieveByCriteria("email", email);
    if (existingUser) {
      return "User existed!";
    }
    const newUser = await createUser(userData);
    newUser.balance = await userService.retrieveBalance(newUser.user_id);
    const accessToken = generateToken(newUser, "1h");
    const refreshToken = generateToken(newUser, "7d");
    newUser.access_token = accessToken;
    newUser.refresh_token = refreshToken;

    return { newUser };
  } catch (error) {
    throw error;
  }
};

const createUser = async (userData) => {
  try {
    const { password, roleId, userName } = userData;
    const hashedPassword = sha256(password); // Using sha256 for password hashing
    const newUser = {
      ...userData,
      hashed_password: hashedPassword,
      role_id: roleId,
      user_name: userName,
    };
    delete newUser.roleId;
    delete newUser.userName;
    delete newUser.password;
    const savedUser = await userService.save(newUser);
    newUser.user_id = savedUser.user_id;
    newUser.service = savedUser.service;
    return newUser;
  } catch (error) {
    throw error;
  }
};

const refreshAccessToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_KEY);
    const userId = decoded.user.user_id;
    const user = await userService.retrieveByCriteria("user_id", userId);

    const accessToken = generateToken(user, "1h");

    return accessToken;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  login,
  signUp,
  refreshAccessToken,
  generateToken,
};

function sha256(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

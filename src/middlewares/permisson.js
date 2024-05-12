const jwt = require("jsonwebtoken");
const { retrieveNameById } = require("../services/role.service");

const JWT_SECRET = process.env.JWT_KEY;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token is required" });
  }

  const token = authHeader.substring(7);

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    let roleName = retrieveNameById(decoded.role_id);

    if (roleName !== "admin") {
      return res.status(403).json({ message: "permissions denied" });
    }

    req.user = decoded;
    next();
  });
};

module.exports = {
  verifyToken,
};

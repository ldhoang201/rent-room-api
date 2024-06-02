const jwt = require("jsonwebtoken");
const { retrieveNameById } = require("../services/role.service");

const JWT_SECRET = process.env.JWT_KEY;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token is required" });
  }

  const token = authHeader.substring(7);

  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    let response = await retrieveNameById(decoded.user.role_id);
    console.log(response);

    if (response[0].role_name !== "admin") {
      return res.status(403).json({ message: "permissions denied" });
    }

    req.user = decoded;
    next();
  });
};

module.exports = {
  verifyToken,
};

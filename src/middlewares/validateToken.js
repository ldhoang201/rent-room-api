const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_KEY;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "permissions denied" });
    }

    req.user = decoded;
    next();
  });
};

module.exports = {
  verifyToken
};

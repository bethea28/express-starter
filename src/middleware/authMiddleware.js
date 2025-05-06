// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../user/user.model"); // Adjust the path to your User model

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // const token = authHeader; // use for postman
  const token = authHeader && authHeader.split(" ")[1]; // Extract Bearer token
  console.log("here is my authentoken middle", authHeader);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided." });
  }
  console.log("ENV SECRETS", process.env.ACCESS_TOKEN_SECRET);
  try {
    const decoded = jwt.verify(token, "octheheroaccess"); // use for postman only
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id; // Assuming your JWT payload has 'id' as the user ID

    console.log("USER IS NOW FINDING", userId);
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized: Invalid user." });
    }

    req.user = user; // Attach the user object to the request
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("JWT Verification Error:", err);
    return res.status(403).json({ error: "Forbidden: Invalid token." });
  }
};

module.exports = authenticateToken;

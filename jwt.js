const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).send({ message: "No token provided." });

  try {
    // verify the jwt token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to the request object;
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({ message: "Invalid token." });
  }
};

const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET);
};
module.exports = { jwtAuthMiddleware, generateToken };


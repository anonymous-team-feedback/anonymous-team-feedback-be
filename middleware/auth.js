const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    if (ex.name === "TokenExpiredError") {
      res.status(401).json({ message: "Token has expired." });
    }
    res.status(401).json({ message: "Invalid token." });
  }
};

const jwt = require("jsonwebtoken");

const authAdmin = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("Admin Not loggined");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) throw new Error("Invalid Token");

    if (decoded.role !== "admin") throw new Error("Access denied: Admin only");

    const decodedId = decoded.id;

    req.adminId = decodedId;
    next();
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
};

module.exports = {
  authAdmin,
};

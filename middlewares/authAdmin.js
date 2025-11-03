const jwt = require("jsonwebtoken");

const authAdmin = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("Admin Not loggined");
    const isValidToken = jwt.verify(token, process.env.JWT_ADMIN_CODE);

    if (!isValidToken) throw new Error("Invalid Token");

    const decodedId = isValidToken.id;

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

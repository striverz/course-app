const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("User Not loggined");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) throw new Error("Token is Invalid");

    const decodedId = decoded.id;
    req.userId = decodedId;
    next();
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
};
module.exports = {
  authUser,
};

const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("User Not loggined");

    const isValidToken = jwt.verify(token, process.env.JWT_USER_CODE);
    if (!isValidToken) throw new Error("Token is Invalid");

    const decodedId = isValidToken.id;
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

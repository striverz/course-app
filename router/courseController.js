const express = require("express");
const { authUser } = require("../middlewares/authUser");
const courseController = express.Router();

courseController.get("/preview", authUser, (req, res) => {
  res.json({
    message: "No Course as of now...",
    userId: req.userId,
  });
});

module.exports = {
  courseController,
};

const express = require("express");
const { authUser } = require("../middlewares/authUser");
const { authAdmin } = require("../middlewares/authAdmin");
const { CourseModel } = require("../models/courseModel");
const courseController = express.Router();

courseController.post("/register", authAdmin, async (req, res) => {
  try {
    const { imageUrl, title, price, description } = req.body;
    const adminId = req.adminId;

    await CourseModel.create({
      imageUrl,
      title,
      price,
      description,
      creatorId: adminId,
    });
    res.json({
      message: "Course Created Successfully",
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});
courseController.get("/preview", authUser, async (req, res) => {
  try {
    const courses = await CourseModel.find({});
    res.json({
      courses,
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});

module.exports = {
  courseController,
};

courseController.patch("/update", authAdmin, async (req, res) => {
  res.json({
    message: "Course Updated Successfully",
  });
});
courseController.patch("/delete", authAdmin, async (req, res) => {
  res.json({
    message: "Course Deleted Successfully",
  });
});

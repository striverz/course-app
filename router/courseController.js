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

courseController.patch("/update", authAdmin, async (req, res) => {
  try {
    const { price, courseId } = req.body;

    const updatedCourse = await CourseModel.findByIdAndUpdate(
      courseId,
      { price },
      { new: true }
    );

    res.json({
      message: "Course Updated Successfully",
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});

courseController.delete("/delete", authAdmin, async (req, res) => {
  try {
    const courseId = req.body.courseId;
    const course = await CourseModel.findOne({ _id: courseId });
    await CourseModel.deleteOne({ _id: courseId });

    res.json({
      message: `Deleted the course ${course.title}`,
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});

courseController.get("/preview", async (req, res) => {
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

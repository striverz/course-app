const express = require("express");
const { authUser } = require("../middlewares/authUser");
const { PurchaseModel } = require("../models/purchaseModel");
const { CourseModel } = require("../models/courseModel");

const purchaseController = express.Router();

purchaseController.post("/purchase", authUser, async (req, res) => {
  try {
    const userId = req.userId;
    const courseId = req.body.courseId;

    await PurchaseModel.create({
      userId,
      courseId,
    });

    res.json({
      message: "Course Purchase Successful",
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});

purchaseController.get("/purchase", authUser, async (req, res) => {
  try {
    const userId = req.userId;

    const myPurchases = await PurchaseModel.find({ userId });

    const allCourses = await CourseModel.find({});

    const purchasedCourseIds = myPurchases.map((p) => p.courseId.toString());

    const purchasedCourses = allCourses.filter((course) =>
      purchasedCourseIds.includes(course._id.toString())
    );

    res.json({
      message: "My Purchased courses",
      courses: purchasedCourses,
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});

module.exports = {
  purchaseController,
};

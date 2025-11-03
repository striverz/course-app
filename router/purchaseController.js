const express = require("express");
const { authUser } = require("../middlewares/authUser");
const { PurchaseModel } = require("../models/purchaseModel");

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

    res.json({
      message: "purchased courses",
      courses: myPurchases,
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});

purchaseController.get("/preview", async (req, res) => {
  try {
    const courses = await CourseModel.find({});
    res.json({
      courses: courses,
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

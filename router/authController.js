const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const authController = express.Router();

authController.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body; //zod validation require
  const hashPassword = await bcrypt.hash(password, 10);

  try {
    await UserModel.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashPassword,
    });
    res.json({
      message: `Signup Successful with the user ${firstName}`,
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});

authController.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({
      email: email,
    });
    if (!user) throw new Error("User Not Found.!");
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Password is Incorrect");

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_USER_CODE
    );

    res.cookie("token", token);

    res.json({
      message: "User Login Successful",
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});

authController.post("/logout", (req, res) => {
  try {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.json({
      message: "Logout Succesful",
    });
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
});

module.exports = {
  authController,
};

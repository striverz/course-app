const express = require("express");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/dataBaseConnection");
const { authController } = require("./router/authController");
const { courseController } = require("./router/courseController");
const { purchaseController } = require("./router/purchaseController");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/v1/api", authController);
app.use("/v1/api/course", courseController);
app.use("/v1/api", purchaseController);
connectDB().then(() => {
  app.listen(process.env.PORT_NUMBER, () => {
    console.log("App is Listening..✅");
  });
});

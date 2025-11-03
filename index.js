const express = require("express");
const { connectDB } = require("./config/dataBaseConnection");
const { authController } = require("./router/authController");
const app = express();

app.use(express.json());
app.use("/v1/api", authController);
connectDB().then(() => {
  app.listen(process.env.PORT_NUMBER, () => {
    console.log("App is Listening..✅");
  });
});

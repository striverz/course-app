const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: String,
  },
  { timestamps: true }
);

const AdminModel = mongoose.model("admin", adminSchema);

module.exports = {
  AdminModel,
};

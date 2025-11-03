const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  firstName: String,
  lastName: String,
  emial: String,
  password: String,
});

const AdminModel = mongoose.model("admin", adminSchema);

module.exports = {
  AdminModel,
};

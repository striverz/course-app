const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const objectId = mongoose.Types.ObjectId;

const courseSchema = new Schema({
  imageUrl: String,
  title: String,
  price: Number,
  description: String,
  creatorId: {
    type: objectId,
  },
});

const CourseModel = mongoose.model("course", courseSchema);

module.exports = {
  CourseModel,
};

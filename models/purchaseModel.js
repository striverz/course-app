const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const objectId = mongoose.Types.ObjectId;

const purchaseSchema = new Schema({
  courseId: {
    type: objectId,
  },
  userId: {
    type: objectId,
  },
});

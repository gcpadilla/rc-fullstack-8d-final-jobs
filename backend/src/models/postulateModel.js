const mongoose = require("mongoose");

const PostulateSchema = new mongoose.Schema(
  {
    intendedsalary: {
      type: String,
      required: true,
      trim: true,
    },
    experiences: {
      type: String,
      required: true,
      trim: true,
    },
    studies: {
      type: String,
      required: true,
      trim: true,
    },
    candidateRef: {
      type: Array,
      required: true,
      trim: true,
    },
    offerRef: {
      type: Array,
      required: true,
      trim: true,
    },
  },
  { versionKey: false }
);

const PostulateModel = mongoose.model("postulacion", PostulateSchema);

module.exports = PostulateModel;

const mongoose = require("mongoose");

const PostulateSchema = new mongoose.Schema(
  {
    state: {
      type: String,
      default:"Pendiente",
      required: true,
      trim: true,
    },
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
    emailcandidate: {
      type: String,
      required: true,
      trim: true,
    },
    telcandidate: {
      type: Number,
      trim: true,
    },
    offerid: {
      type: String,
      required: true,
      trim: true,
    },
    candidateid: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { versionKey: false }
);

const PostulateModel = mongoose.model("Postulation", PostulateSchema);

module.exports = PostulateModel;

const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  imageUrl: {
    type: String,
  },
  cv: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  dni: {
    type: Number,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    trim: true,
  },
  profession:{
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    default:"user",
   },
  dateOfBirth:{
    type: String,
    required: true,
    trim: true
  },
  postulateRef: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Postulation' }],
  token: [ String ]
}, { versionKey: false });

const CandidateModel = mongoose.model("Candidate", CandidateSchema);

module.exports = CandidateModel;

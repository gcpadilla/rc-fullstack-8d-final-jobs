const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  token: [ String ]
}, { versionKey: false });

const AdminModel = mongoose.model("Administrator", AdminSchema);

module.exports = AdminModel;

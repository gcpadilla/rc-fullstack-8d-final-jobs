const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  summary: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  profession: {
    type: String,
    required: true,
    trim: true,
  },
  availability: {
    type: String,
    required: true,
    trim: true,
  },
  workplace: {
    type: String,
    required: true,
    trim: true
  },
  active: {
    type: Boolean,
    default:false,
    trim: true,
  },
  quota:{
    type: Number,
    required: true,
    trim: true
  },
  publicationdate: {
    type: String,
    required: true,
    trim: true,
  },
  postulantRef: {
    type: Array,
    required: true,
    trim: true,
  },
}, { versionKey: false });

const OfferModel = mongoose.model("offer", OfferSchema);

module.exports = OfferModel;

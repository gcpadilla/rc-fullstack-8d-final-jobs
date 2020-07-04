const { validationResult } = require("express-validator");
const postulateModel = require("../models/postulateModel");
const mongoose = require("mongoose");
const candidateModel = require("../models/candidateModel");
const offerModel = require("../models/offerModel")

//crear postulacion
exports.createPostulate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { body } = req;

  const postulateData = {
    intendedsalary: body.intendedsalary,
    experiences: body.experiences,
    studies: body.studies,
    emailcandidate: body.emailcandidate,
    offerid: mongoose.Types.ObjectId(req.params.offerId),
    candidateid: res.locals.user.id,
  };

  const postulate = new postulateModel(postulateData);

  try {
    const candidate_id = await candidateModel.findOne({
      _id: res.locals.user.id,
    });
    if (candidate_id) {
      await postulate.save();

      const offer = await offerModel.findById({_id: mongoose.Types.ObjectId(req.params.offerId)});
      const candidate = await candidateModel.findById({_id: res.locals.user.id});

      offer.postulateRef.push(postulate._id)
      await offer.save()
      candidate.postulateRef.push(postulate._id)
      await candidate.save()

      res.send({
        message: "Se registro postulacion correctamente..",
        postulate,
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

//todas las postulaciones admin
exports.getAllPostulates = async (req, res) => {
  try {
    const postulates = await postulateModel.find({});
    res.send(postulates);
  } catch (err) {
    res.status(500).send(err);
  }
};

//todas las postulaciones user
//agrager filtrado candidateid
exports.getAllPostulatessUser = async (req, res) => {
  try {
    const postulates = await postulateModel.find({candidateid: res.locals.user.id});
    console.log(postulates)
    res.send(postulates);
  } catch (err) {
    res.status(500).send(err);
  }
};
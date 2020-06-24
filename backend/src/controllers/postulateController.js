const { validationResult } = require("express-validator");
const postulateModel = require("../models/postulateModel");
const mongoose = require("mongoose");
const candidateModel = require("../models/candidateModel");

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
      res.send({ message: "Se registro postulacion correctamente..", postulate });
    }
    return res.status(500).send(err);
  } catch (err) {
    res.status(500).send(err);
  }
};

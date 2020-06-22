const { validationResult } = require("express-validator");
const postulateModel = require("../models/postulateModel");

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
    emailcandidate: body.emailcandidate
  };


  const postulate = new postulateModel(postulateData);

  try {
    await postulate.save();
    res.send({ message: "Se registro postulacion correctamente.." });
  } catch (err) {
    res.status(500).send(err);
  }
};
const { validationResult } = require("express-validator");
const offerModel = require("../models/offerModel");

//crear usuario
exports.createOffer = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { body } = req;

  const offerData = {
    title: body.title,
    summary: body.summary,
    description: body.description,
    profession: body.profession,
    availability: body.availability,
    workplace: body.workplace,
    active: body.active,
    quota: body.quota,
    publicationdate: body.publicationdate,
  };


  const Offer = new offerModel(offerData);

  try {
    await Offer.save();
    res.send({ message: "Se registro oferta correctamente.." });
  } catch (err) {
    res.status(500).send(err);
  }
};
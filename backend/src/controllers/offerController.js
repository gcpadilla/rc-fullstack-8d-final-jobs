const { validationResult } = require("express-validator");
const offerModel = require("../models/offerModel");
const adminModel = require("../models/administratorModel");

//crear oferta
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
    const admin_id = await adminModel.findOne({ _id: res.locals.user.id });
    if (admin_id) {
      await Offer.save();
      res.send({ message: "Se registro oferta correctamente.." });
    }
    return res.status(500).send(err);
  } catch (err) {
    res.status(500).send(err);
  }
};

//todas las ofertas activas
exports.getAllOffersActives = async (req, res) => {
  try {
    const offers = await offerModel.find({active: true});
    res.send(offers);
  } catch (err) {
    res.status(500).send(err);
  }
};

const { validationResult } = require("express-validator");
const offerModel = require("../models/offerModel");
const adminModel = require("../models/administratorModel");
const mongoose = require("mongoose");

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

  

  try {
    const admin_id = await adminModel.findOne({ _id: res.locals.user.id });
    if (admin_id) {
      const Offer = new offerModel(offerData);
      await Offer.save();
      res.send({ message: "Se registro oferta correctamente..", Offer });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

//todas las ofertas activas
exports.getAllOffers = async (req, res) => {
  try {
    const offers = await offerModel.find({active: true},"-postulateRef -active");
    res.send(offers);
  } catch (err) {
    res.status(500).send(err);
  }
};

//Una oferta
exports.getOffer = async (req, res) => {

  try {
		if (!mongoose.Types.ObjectId.isValid(req.params.OfferId)) {
			return res.status(404).json({ message: "Offer not found." });
    }
    
		const offer = await offerModel.findById(req.params.OfferId, "-postulateRef -active");
		if (!offer) {
			return res.status(404).json({ message: "Offer not found." });
		}

		res.send(offer);
	} catch (err) {
		res.status(500).send(err);
	}
};

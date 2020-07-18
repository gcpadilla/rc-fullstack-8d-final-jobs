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
    categories: body.categories,
  };

  try {
    const admin_id = await adminModel.findOne({ _id: res.locals.user.id });
    if (admin_id) {
      const Offer = new offerModel(offerData);
      await Offer.save();
      res.send({ message: "Se registro oferta correctamente.." });
    }
  } catch (error) {
    res.status(500).send({ message: "Error al crear oferta ..." });
  }
};

//todas las ofertas
exports.getAllOffers = async (req, res) => {
  try {
    const offers = await offerModel.find({});
    res.send(offers);
  } catch (error) {
    res.status(500).send({ message: "Error al traer ofertas ..." });
  }
};

//editar oferta
exports.updateOffer = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: "No de encontro oferta ..." });
    }

    const offerta = await offerModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!offerta) {
      return res.status(404).json({ message: "No de encontro oferta ..." });
    }

    res.send({
      message: "Se actualizaron datos correctamente...",
      offerta,
    });
  } catch (error) {
    res.status(500).send({ message: "Error al editar oferta ..." });
  }
};

//Borrar oferta
exports.deleteOffer = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: "No de encontro oferta ..." });
    }

    const oferta = await offerModel.findByIdAndDelete(req.params.id);

    if (!oferta) {
      return res.status(404).json({ message: "No de encontro oferta ..." });
    }

    return res.status(200).send({ message: "Oferta eliminada" });
  } catch (error) {
    res.status(500).send({ message: "Error al borrar oferta ..." });
  }
};

//todas las ofertas activas
exports.getAllOffersActive = async (req, res) => {
  try {
    const offers = await offerModel.find(
      { active: true },
      "-postulateRef -active"
    );
    res.send(offers);
  } catch (err) {
    res.status(500).send(err);
  }
};

//todas las ofertas para el home
exports.getAllOffersHome = async (req, res) => {
  try {
    const offers = await offerModel
      .find(
        { active: true },
        "-active -postulateRef -_id -description -publicationdate -profession -availability -workplace -categories"
      )
      .sort("-publicationdate")
      .limit(4);
    res.send(offers);
  } catch (err) {
    res.status(500).send(err);
  }
};

//Una oferta user
exports.getOffer = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.OfferId)) {
      return res.status(404).json({ message: "Offer not found." });
    }

    const offer = await offerModel.findById(
      req.params.OfferId,
      "-postulateRef -active"
    );
    if (!offer) {
      return res.status(404).json({ message: "Offer not found." });
    }

    res.send(offer);
  } catch (err) {
    res.status(500).send(err);
  }
};

//Postulaciones de Una oferta
exports.getPostulationsOffer = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.OfferId)) {
      return res.status(404).json({ message: "Offer not found." });
    }

    const offer = await offerModel
      .findById(req.params.OfferId)
      .populate(
        "postulateRef",
       "-candidateid",
       )
       .populate(
        "candidateRef",
        "firstname lastname -_id"
       )
    if (!offer) {
      return res.status(404).json({ message: "Offer not found." });
    }

    res.send(offer);
  } catch (err) {
    res.status(500).send(err);
  }
};

//Una oferta admin
exports.getOfferAdmin = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.OfferId)) {
      return res.status(404).json({ message: "Offer not found." });
    }

    const offer = await offerModel.findById(req.params.OfferId);
    if (!offer) {
      return res.status(404).json({ message: "Offer not found." });
    }

    res.send(offer);
  } catch (err) {
    res.status(500).send(err);
  }
};

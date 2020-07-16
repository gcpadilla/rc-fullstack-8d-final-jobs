const { validationResult } = require("express-validator");
const express = require('express');
const postulateModel = require("../models/postulateModel");
const mongoose = require("mongoose");
const candidateModel = require("../models/candidateModel");
const offerModel = require("../models/offerModel");

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

  const post = await postulateModel
    .findOne()
    .where({ candidateid: res.locals.user.id })
    .where({ offerid: mongoose.Types.ObjectId(req.params.offerId) });

  if (post) {
    return res
      .status(400)
      .json({ message: "Ya estas postulado a esta oferta . . ." });
  }

  const candidate = await candidateModel.findById({
    _id: res.locals.user.id,
  });

  try {
    if (candidate) {
      const postulate = new postulateModel(postulateData);
      await postulate.save();

      const offer = await offerModel.findById({
        _id: mongoose.Types.ObjectId(req.params.offerId),
      });

      offer.postulateRef.push(postulate._id);
      await offer.save();
      candidate.postulateRef.push(postulate._id);
      await candidate.save();

      res.send({
        message: "Se registro postulacion correctamente..",
        postulate
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
exports.getAllPostulatessUser = async (req, res) => {
  try {
    const postulates = await postulateModel.find(
      { candidateid: res.locals.user.id },
      "-candidateid"
    );

    if (postulates.length===0) {
      return res
      .status(400)
      .json({ message: "No tienes postulaciones . . ." });
    }
    res.send(postulates);
  } catch (err) {
    res.status(500).send(err);
  }
};

//Editar postulación
exports.updatePostulate = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res
        .status(404)
        .json({ message: "No de encontro postulación ..." });
    }

    const postulate_in_db = await postulateModel.findOne({
      _id: req.params.id,
    });

    if (!postulate_in_db) {
      return res.status(400).json({ message: "Credenciales no validas." });
    }

    const { body } = req;

    const postulateData = {
      state: postulate_in_db.state,
      intendedsalary: body.intendedsalary,
      experiences: body.experiences,
      studies: body.studies,
      emailcandidate: body.emailcandidate,
    };

    let postulate = await postulateModel.findByIdAndUpdate(
      req.params.id,
      postulateData,
      { new: true }
    );

    postulate = await postulateModel.findOne(
      { _id: req.params.id },
      "-candidateid"
    );

    if (!postulate) {
      return res
        .status(404)
        .json({ message: "No de encontro postulación ..." });
    }
    
    res.send({
			message: "Se actualizaron tus datos correctamente...",
			postulate,
    });
    
  } catch (err) {
    res.status(500).send({ message: "Error al editar postulación ..." });
  }
};

//Editar postulación administrador
exports.updatePostulateAdmin = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res
        .status(404)
        .json({ message: "No de encontro postulación ..." });
    }

    const postulate_in_db = await postulateModel.findOne({
      _id: req.params.id,
    });

    if (!postulate_in_db) {
      return res.status(400).json({ message: "Credenciales no validas." });
    }

    const { body } = req;

    const postulateData = {
      state: body.state,
      intendedsalary: postulate_in_db.intendedsalary,
      experiences: postulate_in_db.experiences,
      studies: postulate_in_db.studies,
      emailcandidate: postulate_in_db.emailcandidate,
    };

    let postulate = await postulateModel.findByIdAndUpdate(
      req.params.id,
      postulateData,
      { new: true }
    );

    postulate = await postulateModel.findOne(
      { _id: req.params.id },
      "-candidateid"
    );

    if (!postulate) {
      return res
        .status(404)
        .json({ message: "No de encontro postulación ..." });
    }
    
    res.send({
			message: "Se actualizaron tus datos correctamente...",
			postulate,
    });
    
  } catch (err) {
    res.status(500).send({ message: "Error al editar postulación ..." });
  }
};

//Borrar postulacion
exports.deletePostulate = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res
        .status(404)
        .json({ message: "No de encontro postulación ..." });
    }

    const postulate = await postulateModel.findByIdAndDelete(req.params.id);

    if (!postulate) {
      return res
        .status(404)
        .json({ message: "No de encontro postulación ..." });
    }

    return res.status(200).send({ message: "Postulación eliminada" });
  } catch (error) {
    res.status(500).send({ message: "Error al borrar postulación ..." });
  }
};

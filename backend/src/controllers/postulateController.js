const { validationResult } = require("express-validator");
const postulateModel = require("../models/postulateModel");
const mongoose = require("mongoose");
const candidateModel = require("../models/candidateModel");
const offerModel = require("../models/offerModel");
const sendEmail = require("../middlewares/sendEmail");

//crear postulacion
exports.createPostulate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const candidate = await candidateModel.findById({
    _id: res.locals.user.id,
  });

  if (!candidate) {
    return res.status(400).json({ message: "No se encontro candidato . . ." });
  }

  const { body } = req;

  const postulateData = {
    intendedsalary: body.intendedsalary,
    experiences: body.experiences,
    studies: body.studies,
    emailcandidate: candidate.email,
    offerid: mongoose.Types.ObjectId(req.params.offerId),
    candidateid: res.locals.user.id,
  };

  const existPost = await postulateModel
    .findOne()
    .where({ candidateid: res.locals.user.id })
    .where({ offerid: mongoose.Types.ObjectId(req.params.offerId) });

  if (existPost) {
    return res
      .status(400)
      .json({ message: "Ya estas postulado a esta oferta . . ." });
  }

  try {
    const postulate = new postulateModel(postulateData);
    await postulate.save();

    const offer = await offerModel.findById({
      _id: mongoose.Types.ObjectId(req.params.offerId),
    });
    console.log(offer);

    offer.postulateRef.push(postulate._id);
    offer.candidateRef.push(candidate._id);
    await offer.save();
    candidate.postulateRef.push(postulate._id);
    await candidate.save();

    res.send({
      message: "Se registro postulacion correctamente..",
      postulate,
    });
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

    if (postulates.length === 0) {
      return res.status(200).json({ message: "No tienes postulaciones . . ." });
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

    const { state } = req.body;

    if (!state) {
      return res.status(400).json({ message: "Se produjo un error. . ." });
    }

    const postulate_in_db = await postulateModel.findOne({
      _id: req.params.id,
    });

    if (!postulate_in_db) {
      return res.status(400).json({ message: "Credenciales no validas." });
    }

    const offer_in_db = await offerModel.findOne({
      _id: postulate_in_db.offerid,
    });

    //----------------------Email------------------------------------------------------------

    if (state !== "Pendiente") {
      let oferta = offer_in_db.title;
      let email = postulate_in_db.emailcandidate;
      let subject = "Postulacion a Jobs";
      let msg = state;
      if (state === "Admitido") {
        let html = `<div style=" width: 500px">
                      <h1> &#60; Roling<strong style="color:#312f73">Jobs</strong> &#62; </h1>
                      <h2>Felicidades fuiste selecionado &#128578;</h2>
                      <h3>
                      Estas ${msg} a tu postulacion de ${oferta}, cominicate al telefono 12345 o dirigete a Av. Siempreviva 742.
                      </h3>
                    </div>`;
        await sendEmail(email, subject, html);
      } else {
        let html = `<div style=" width: 500px">
                      <h1> &#60; RolingJobs &#62; </h1>
                      <h2>Lamentablemente no quedaste &#128532; </h2>
                      <p>
                      Estas ${msg} a tu postulacion de ${oferta}, lo sentimos, gracias por postularte.
                      </p>
                    </div>`;
        await sendEmail(email, subject, html);
      }
    } else {
      return res
        .status(404)
        .json({ message: "El estado continua pendiente. . ." });
    }

    //----------------------Email------------------------------------------------------------

    let postulate = await postulateModel.findByIdAndUpdate(
      req.params.id,
      { state: state },
      { new: true }
    );
    console.log(postulate);

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

    let postulate = await postulateModel.findById(req.params.id);

    if (!postulate) {
      return res
        .status(404)
        .json({ message: "No de encontro postulación ..." });
    }

    const oferta = await offerModel.findById(postulate.offerid);

    const candidateRef = oferta.candidateRef;
    let indiceCandidate = candidateRef.indexOf(res.locals.user.id);
    candidateRef.splice(indiceCandidate, 1);

    const postulateRef = oferta.postulateRef;
    let indicePostulate = candidateRef.indexOf(res.locals.user.id);
    postulateRef.splice(indicePostulate, 1);

    await offerModel.findByIdAndUpdate(
      postulate.offerid,
      { candidateRef: candidateRef, postulateRef: postulateRef },
      { new: true }
    );

    postulate = await postulateModel.findByIdAndDelete(req.params.id);

    if (!postulate) {
      return res
        .status(404)
        .json({ message: "No de encontro postulación ..." });
    }

    return res.status(200).send({ message: "Se borro postulacion" });
  } catch (error) {
    res.status(500).send({ message: "Error al borrar postulación ..." });
  }
};

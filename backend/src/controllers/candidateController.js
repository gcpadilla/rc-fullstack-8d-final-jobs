const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const formidable = require("formidable")
const path = require("path");
const fs = require("fs")
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const candidateModel = require("../models/candidateModel");
const uploadImagenModel = require("../models/uploadImageModel");
const uploadCvModel = require("../models/uploadCvModel");
const sendEmail = require("../middlewares/sendEmail");

//crear candidato
exports.createCandidate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { body } = req;

  let user_exists = await candidateModel.findOne({ username: body.username });
  let email_exists = await candidateModel.findOne({ email: body.email });
  let dni_exists = await candidateModel.findOne({ dni: body.dni });
  if (user_exists) {
    return res.status(400).json({ message: "Usuario ya existe..." });
  }
  if (email_exists) {
    return res.status(400).json({ message: "email ya existe..." });
  }
  if (dni_exists) {
    return res.status(400).json({ message: "dni ya existe..." });
  }

  const candidateData = {
    firstname: body.firstname,
    lastname: body.lastname,
    username: body.username,
    email: body.email,
    dni: body.dni,
    age: body.age,
    profession: body.profession,
    dateOfBirth: body.dateOfBirth,
    postulantRef: body.postulantRef,
    token: [],
  };

  const salt = await bcryptjs.genSalt(10);
  candidateData.password = await bcryptjs.hash(body.password, salt);

  const user = new candidateModel(candidateData);

  try {
    await user.save();
   
    //----------------------Email------------------------------------------------------------

      let email = candidateData.email;
      let subject = "Registro a RollingJobs";
      let html =  `<div style=" width: 500px">
                      <h1> &#60; Roling<strong style="color:#312f73">Jobs</strong> &#62; </h1>
                      <h2>Felicidades, ahora estas listo para buscar tu empleo soñado &#128578;</h2>
                      <h3>
                      Hola ${candidateData.firstname} ${candidateData.lastname},  el quipo de RollingJobs de ta la bienvenida, ya puedes comenzar con la busqueda de trabajo.
                      </h3>
                    </div>`;
        await sendEmail(email, subject, html);
      

    //----------------------Email------------------------------------------------------------
    res.send({ message: "Se registro usuario correctamente.." });
  } catch (err) {
    res.status(500).send(err);
  }
};

//loguear candidato
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { body } = req;

  let user_in_db = await candidateModel.findOne({ username: body.username });
  if (!user_in_db) {
    return res.status(400).json({ message: "Credenciales no validas." });
  }

  const passCheck = await bcryptjs.compare(body.password, user_in_db.password);
  if (!passCheck) {
    return res.status(400).json({ message: "Credenciales no validas." });
  }

  const jwt_payload = {
    user: {
      id: user_in_db.id,
      username: user_in_db.username,
      role: user_in_db.role,
    },
  };

  try {
    // const token = jsonwebtoken.sign(jwt_payload, process.env.JWT_SECRET, {
    // expiresIn: process.env.TOKEN_EXP_TIME,
    // });
    const token = jsonwebtoken.sign(jwt_payload, process.env.JWT_SECRET);
    user_in_db.token.push(token);
    //user_in_db.token = [token];
    await candidateModel.update({ username: user_in_db.username }, user_in_db);
    res.send({
      message: "Se logueo perfecto",
      token,
      role: user_in_db.role,
      username: user_in_db.username,
    });
  } catch (error) {
    return res.status(500).json({ message: "ERROR DE LOGIN.", error });
  }
};

//desloguear candidato
exports.logout = async (req, res) => {
  try {
    await candidateModel.updateOne(
      { _id: res.locals.user.id },
      { $set: { token: [] } }
    );

    res.json({ message: "Se deslogueo perfecto" });
  } catch (error) {
    res.status(500).send({ message: "ERROR DE LOGOUT.", error });
  }
};

//actualizar datos de candidato
exports.updateCandidate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  if (!res.locals.user.id) {
    return res.status(404).json({ message: "No se encontro candidato..." });
  }

  const { body } = req;

  const user_in_db = await candidateModel
    .find()
    .or({ username: body.username })
    .or({ email: body.email })
    .or({ dni: body.dni });

  const cantidad = user_in_db.length;

  if (cantidad > 1) {
    return res
      .status(400)
      .json({ message: "Nombre de usuario, email, o dni ya existen" });
  }

  try {
    const userNew = {
      firstname: body.firstname,
      lastname: body.lastname,
      username: body.username,
      email: body.email,
      dni: body.dni,
      age: body.age,
      profession: body.profession,
    };
    const salt = await bcryptjs.genSalt(10);
    userNew.password = await bcryptjs.hash(body.password, salt);

    const user = await candidateModel.findByIdAndUpdate(
      res.locals.user.id,
      userNew,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "No se encontro candidato..." });
    }

    let userNewData = await candidateModel.findOne(
      { _id: res.locals.user.id },
      "-_id -role -token -password"
    );
    res.send({
      message: "Se actualizaron tus datos correctamente...",
      userNewData,
    });
  } catch (error) {
    res.status(500).send({ message: "Error al actualizar ...." });
  }
};

//borrar candidato
exports.deleteCandidate = async (req, res) => {
  try {
    if (!res.locals.user.id) {
      return res.status(404).json({ message: "No se encontro candidato..." });
    }

    const user = await candidateModel.findByIdAndDelete(res.locals.user.id);

    if (!user) {
      return res.status(404).json({ message: "No se encontro candidato..." });
    }

    return res.status(200).send({ message: "Candidato Eliminado ..." });
  } catch (error) {
    res.status(500).send({ message: "Error al eliminar candidato ..." });
  }
};

//get candidato
exports.editCandidate = async (req, res) => {
  try {
    if (!res.locals.user.id) {
      return res.status(404).json({ message: "No se encontro candidato..." });
    }

    const user = await candidateModel.findById(
      res.locals.user.id,
      "-postulateRef -role -token -_id -publicationdate"
    );

    if (!user) {
      return res.status(404).json({ message: "No se encontro candidato..." });
    }

    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

// cargar imagen de perfil
exports.uploadImages = async (req, res) => {

  try {
    if (!res.locals.user.id){
      return res.status(404).json({ message: "No se encontro candidato..."});
    }

    const candidate = await candidateModel.findById(res.locals.user.id);
    
    if (!candidate) {
      return res.status(404).json({ message: "No se encontro candidato..."});
    }
  } catch (err) {
    res.status(500).send(err);
  }

  const form = formidable({
    hash: 'sha256',
    multiples: true,
    keepExtensions: true
  });

  form.onPart = part => {
    if (['image/jpeg', 'image/png', 'image/gif'].indexOf(part.mime) !== -1) {
        form.handlePart(part);
    }
  };

  form.parse(req, async (err, fields, files) => {
    const filesResult = [];


    for (let fieldName in files) {
      const fieldData = files[fieldName];
      
      if (Array.isArray(fieldData)) {
        fieldData.forEach(f => {
          const filename = path.basename(f.path);
          const newFileLocation = path.join(__dirname, '../public', filename);
          fs.renameSync(f.path, newFileLocation);
          filesResult.push({ 
            fieldName,
            hash: f.hash,
            originalFileName: f.name,
            filename,
            sizeInBytes: f.size,
            mimeType: f.type
          });
        });
      } else {
        const filename = path.basename(fieldData.path);
        const newFileLocation = path.join(__dirname, '../public', filename);
        fs.renameSync(fieldData.path, newFileLocation);
        filesResult.push({ 
          fieldName,
          hash: fieldData.hash,
          originalFileName: fieldData.name,
          filename,
          sizeInBytes: fieldData.size,
          mimeType: fieldData.type
        });
      }
    }

    const upload = new uploadImagenModel({
      resourceType: 'candidate',
      resourceId: new mongoose.Types.ObjectId(res.locals.user.id),
      files: filesResult
    });

    try {
      await upload.save();
      await candidateModel.findByIdAndUpdate(res.locals.user.id, { imageUrl: '/static/' + upload.files[0].filename }, { new: true });
      res.send({
        message: "Se guardo imagen de perfil . . .",
        upload,
      });
    } catch (err) {
      res.status(500).send(err);
    }

  });
};

// cargar cv de candidato
exports.uploadCv = async (req, res) => {

  try {
    if (!res.locals.user.id){
      return res.status(404).json({ message: "No se encontro candidato..."});
    }

    const candidate = await candidateModel.findById(res.locals.user.id);
    
    
    if (!candidate) {
      return res.status(404).json({ message: "No se encontro candidato..."});
    }
  } catch (err) {
    res.status(500).send(err);
  }

  const form = formidable({
    hash: 'sha256',
    multiples: false,
    keepExtensions: true
  });

  form.parse(req, async (err, fields, files) => {
    const filesResult = [];

    for (let fieldName in files) {
      const fieldData = files[fieldName];

        let extencion = /(.docx|.pdf|.doc)$/i;
        if(!extencion.exec(fieldData.path)){
          return res.status(415).json({ message: "Tipo de archivo incorrecto."});
        }
      
      if (Array.isArray(fieldData)) {
        fieldData.forEach(f => {
          const filename = path.basename(f.path);
          const newFileLocation = path.join(__dirname, '../public', filename);
          fs.renameSync(f.path, newFileLocation);
          filesResult.push({ 
            fieldName,
            hash: f.hash,
            originalFileName: f.name,
            filename,
            sizeInBytes: f.size,
            mimeType: f.type
          });
        });
      } else {
        const filename = path.basename(fieldData.path);
        const newFileLocation = path.join(__dirname, '../public', filename);
        fs.renameSync(fieldData.path, newFileLocation);
        filesResult.push({ 
          fieldName,
          hash: fieldData.hash,
          originalFileName: fieldData.name,
          filename,
          sizeInBytes: fieldData.size,
          mimeType: fieldData.type
        });
      }
    }

    const upload = new uploadCvModel({
      resourceType: 'candidate',
      resourceId: new mongoose.Types.ObjectId(res.locals.user.id),
      files: filesResult
    });

    try {
      await upload.save();
      await candidateModel.findByIdAndUpdate(res.locals.user.id, { cv: '/static/' + upload.files[0].filename }, { new: true });
      res.send({
        message: "Se guardo cv de candidato . . .",
        upload,
      });
    } catch (err) {
      res.status(500).send(err);
    }

  });
};
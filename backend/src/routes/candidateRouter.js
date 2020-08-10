const express = require("express");
const { body } = require("express-validator");
const authorize = require("../middlewares/authorizeCandidate");
const router = express.Router();

const candidateController = require("../controllers/candidateController");

//CREAR CANDIDATO
router.post(
  "/",
  [
    body("firstname", "El nombre no puede ser nulo").notEmpty(),
    body("firstname", "No puedes incluir mas de 25 caracteres").isLength({
      max: 25,
    }),
    body("lastname", "El apellido no puede ser nulo").notEmpty(),
    body("lastname", "No puedes incluir mas de 25 caracteres").isLength({
      max: 25,
    }),
    body("username", "El usuario no puede ser nulo").notEmpty(),
    body("username", "No puedes incluir mas de 25 caracteres").isLength({
      max: 25,
    }),
    body("dateOfBirth", "Debe ingresar fecha de nacimiento").notEmpty(),
    body("dni", "Dni no admitido")
      .isLength({ min: 7, max: 8 })
      .isNumeric()
      .isInt(),
    body("email", "El email no puede ser nulo").notEmpty(),
    body("email", "Debe ser un email valido").isEmail(),
    body("password", "Password no puede ser nulo").notEmpty(),
    body("password", "debe contener al menos un núnero").matches(/\d/),
    body("password", "debe contener al menos una mayuscula").matches(/[A-Z]/),
    body("password", "debe contener al menos una minuscula").matches(/[a-z]/),
    body("password", "debe incluir de 8 a 32 caracteres").isLength({
      min: 8,
      max: 32,
    }),
    body("age", "La edad no puede ser nula").notEmpty(),
    body("profession", "La profesion no puede ser nula").notEmpty(),
  ],
  candidateController.createCandidate
);

//IMAGEN DE PERFIL
router.post("/upImagen", authorize("user"), candidateController.uploadImages);

//CV DE CANDIDATO
router.post("/upCv", authorize("user"), candidateController.uploadCv);

//LOGUEAR CANDIDATO
router.post(
  "/login",
  [
    body("username", "El usuario no puede ser nulo").notEmpty(),
    body("username", "No puedes incluir mas de 25 caracteres").isLength( {max: 25} ),
    body("password", "Password no puede ser nulo").notEmpty(),
    body("password", "debe contener al menos un núnero").matches(/\d/),
    body("password", "debe contener al menos una mayuscula").matches(/[A-Z]/),
    body("password", "debe contener al menos una minuscula").matches(/[a-z]/),
    body("password", "debe incluir de 8 a 32 caracteres").isLength({
      min: 8,
      max: 32,
    }),
  ],
  candidateController.login
);

//DESCONECTAR CANDIDATO
router.get("/logout", authorize("user"), candidateController.logout);

//EDITAR CANDIDATO
router.put(
  "/",
  [
    body("firstname", "El nombre no puede ser nulo").notEmpty(),
    body("firstname", "No puedes incluir mas de 25 caracteres").isLength({
      max: 25,
    }),
    body("lastname", "El apellido no puede ser nulo").notEmpty(),
    body("lastname", "No puedes incluir mas de 25 caracteres").isLength({
      max: 25,
    }),
    body("username", "El usuario no puede ser nulo").notEmpty(),
    body("username", "No puedes incluir mas de 25 caracteres").isLength({
      max: 25,
    }),
    body("email", "El email no puede ser nulo").notEmpty(),
    body("email", "Debe ser un email valido").isEmail(),
    body("password", "Password no puede ser nulo").notEmpty(),
    body("password", "debe contener al menos un núnero").matches(/\d/),
    body("password", "debe contener al menos una mayuscula").matches(/[A-Z]/),
    body("password", "debe contener al menos una minuscula").matches(/[a-z]/),
    body("password", "debe incluir de 8 a 32 caracteres").isLength({
      min: 8,
      max: 32,
    }),
    body("profession", "La profesion no puede ser nula").notEmpty(),
  ],
  authorize("user"),
  candidateController.updateCandidate
);

//ELIMINAR CANDIDATO
router.delete("/", authorize("user"), candidateController.deleteCandidate);

//EDIT CANDIDATO
router.get("/edit/", authorize("user"), candidateController.editCandidate);

module.exports = router;

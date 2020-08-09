const express = require("express");
const { body } = require("express-validator");
const authorize = require("../middlewares/authorizeAdmin");
const router = express.Router();

const adminController = require("../controllers/adminController");

//PRIMER INICIO
router.get('/', adminController.thereIsAnAdmin);

//CREAR USUARIO ADMIN
router.post(
  "/create", authorize("admin"),
  [
    body("username", "El usuario no puede ser nulo").notEmpty(),
    body("username", "No puedes incluir mas de 25 caracteres").isLength({
      max: 25,
    }),
    body("password", "Password no puede ser nulo").notEmpty(),
    body("password", "Password no puede ser nulo").notEmpty(),
    body("password", "debe contener al menos un núnero").matches(/\d/),
    body("password", "debe contener al menos una mayuscula").matches(/[A-Z]/),
    body("password", "debe contener al menos una minuscula").matches(/[a-z]/),
    body("password", "debe incluir de 8 a 32 caracteres").isLength({
      min: 8,
      max: 32,
    }),
  ],
  adminController.createAdmin
);

//EDITAR DATOS DE ADMINISTRADOR
router.put('/', authorize("admin"), adminController.updateAdmin)

//LOGUEAR USUARIO ADMIN
router.post(
  "/login",
  [
    body("username", "El usuario no puede ser nulo").notEmpty(),
    body("password", "Password no puede ser nulo").notEmpty(),
  ],
  adminController.login
);

//DESCONECTAR USUARIO ADMIN
router.get("/logout", authorize(["user", "admin"]), adminController.logout);

module.exports = router;

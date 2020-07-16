const { body } = require("express-validator");
const express = require("express");
const authorizeAdmin = require("../middlewares/authorizeAdmin");
const authorizeUser = require("../middlewares/authorizeCandidate");
const router = express.Router();
const postulateController = require("../controllers/postulateController");



//CREAR POSTULACION
router.post(
  "/:offerId",
  authorizeUser("user")  ,
  [
    body("intendedsalary", "Incluir salario pretendido").notEmpty(),
    body("experiences", "Debe ingresar experiencia").notEmpty(),
    body("studies", "Debe incluir estudios").notEmpty(),
    body("emailcandidate", "El email no puede ser nulo").notEmpty(),
    body("emailcandidate", "Debe ser un email valido").isEmail(),
  ],
  postulateController.createPostulate
);

//LISTAR TODAS LAS POSTULACIONES ADMIN

router.get("/admin/all", authorizeAdmin("admin"), postulateController.getAllPostulates);

//LISTAR TODAS LAS POSTULACIONES USER

router.get("/user/all", authorizeUser("user"), postulateController.getAllPostulatessUser);

//BORRAR POSTULACION
router.delete("/:id", authorizeUser("user"), postulateController.deletePostulate);

//EDITAR POSTULACION
router.put('/:id', authorizeUser("user"), postulateController.updatePostulate);

//EDITAR POSTULACION ADMIN
router.put('/:id/admin', authorizeAdmin("admin"), postulateController.updatePostulateAdmin);

module.exports = router;

const express = require("express");
const UserController = require("../controllers/UserController");
const { authentication } = require("../middlewares/authentication");
const { uploadUserPostsImages } = require("../middlewares/multer");
const validateBodyParams = require("../middlewares/validateBodyParams");
const { check } = require("express-validator");
const router = express.Router();

router.post(
  "/createUser",
  [
    check("firstName", "El campo de nombre no puede estar vacío").notEmpty(),
    check("lastName", "El campo de apellidos no puede estar vacío").notEmpty(),
    check(
      "username",
      "El campo de nombre de usuario no puede estar vacío"
    ).notEmpty(),
    check("email", "El formato del email no es válido").isEmail(),
    check("password")
      .notEmpty()
      .withMessage("El campo de nombre no puede estar vacío")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
      )
      .withMessage(
        "La contraseña debe incluir al menos 1 minúscula, 1 mayúscula, un carúcter especial y 8 caracteres en total"
      ),
    check("password2", "Por favor, confirma la contraseña").notEmpty(),
    validateBodyParams,
  ],
  UserController.createAssociation
);
router.post(
  "/createAssociation",
  [
    check(
      "username",
      "El campo de nombre de usuario no puede estar vacío"
    ).notEmpty(),
    check("firstName", "El campo de nombre no puede estar vacío").notEmpty(),
    check("lastName", "El campo de apellidos no puede estar vacío").notEmpty(),
    check("email", "El formato del email no es válido").isEmail(),
    check("cif", "El campo CIF no puede estar vacío").notEmpty(),
    check("password")
      .notEmpty()
      .withMessage("El campo de nombre no puede estar vacío")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
      )
      .withMessage(
        "La contraseña debe incluir al menos 1 minúscula, 1 mayúscula, un carácter especial y 8 caracteres en total"
      ),
    check("password2", "Por favor, confirma la contraseña").notEmpty(),
    validateBodyParams,
  ],
  UserController.createUser
);
router.post("/loginUser", UserController.login);
router.delete("/logoutUser", authentication, UserController.logout);
router.get("/getInfo", authentication, UserController.getInfo);
router.get("/getAllUsers", UserController.getAllUsers);
module.exports = router;

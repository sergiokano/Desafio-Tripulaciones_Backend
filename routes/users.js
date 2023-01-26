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
        check(
            "firstName",
            "El campo de nombre no puede estar vacío"
        ).notEmpty(),
        check(
            "lastName",
            "El campo de apellidos no puede estar vacío"
        ).notEmpty(),
        check("username", "El campo de nombre de usuario no puede estar vacío")
            .notEmpty()
            .matches(/^\S*$/, "g")
            .withMessage(
                "El nombre de usuario tiene que ir junto, sin espacios"
            )
            .isLength({ max: 30 }),
        check("email", "El formato del email no es válido").isEmail(),
        check("phone", "El formato del teléfono no es válido").matches(
            /^[0-9]{9}$/
        ),
        check("password")
            .notEmpty()
            .withMessage("El campo de contraseña no puede estar vacío")
            .matches(
                // /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
                /^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&*_]) (?=.{8,})/
            )
            .withMessage(
                "La contraseña debe incluir al menos 1 minúscula, 1 mayúscula, un carácter especial y un mínimo de 8 caracteres"
            ),
        check("password2", "Por favor, confirma la contraseña").notEmpty(),
        validateBodyParams,
    ],
    UserController.createUser
);
router.post(
    "/createAssociation",
    [
        check("username", "El campo de nombre de usuario no puede estar vacío")
            .notEmpty()
            .matches(/^\S*$/, "g")
            .withMessage(
                "El nombre de usuario tiene que ir junto, sin espacios"
            )
            .isLength({ max: 30 })
            .withMessage(
                "El nombre de usuario no puede contener más de 30 carácteres"
            ),
        check(
            "firstName",
            "El campo de nombre no puede estar vacío"
        ).notEmpty(),
        check(
            "lastName",
            "El campo de apellidos no puede estar vacío"
        ).notEmpty(),
        check("email", "El formato del email no es válido").isEmail(),
        check("phone", "El formato del teléfono no es válido").matches(
            /^[0-9]{9}$/
        ),
        check("cif", "El campo CIF no puede estar vacío")
            .notEmpty()
            .matches(/^[A-Z]{1}[0-9]{8}$/)
            .withMessage(
                "El número CIF está en un formato incorrecto. Ej: A12345678"
            ),
        check("password")
            .notEmpty()
            .withMessage("El campo de contraseña no puede estar vacío")
            .matches(
                // /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
                /^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#$%^&*_]) (?=.{8,})/

            )
            .withMessage(
                "La contraseña debe incluir al menos 1 minúscula, 1 mayúscula, un carácter especial y un mínimo de 8 caracteres"
                            ),
        check("password2", "Por favor, confirma la contraseña").notEmpty(),
        validateBodyParams,
    ],
    UserController.createAssociation
);
router.post("/loginUser", UserController.login);
router.delete("/logoutUser", authentication, UserController.logout);
router.get("/getInfo", authentication, UserController.getInfo);
router.get("/getAllUsers", UserController.getAllUsers);
module.exports = router;

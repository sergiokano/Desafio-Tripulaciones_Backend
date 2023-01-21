const { response } = require("express");
const { validationResult } = require("express-validator");

const validateBodyParams = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.errors,
        });
    }

    next();
};

module.exports = validateBodyParams;

const handleValidationError = (err, res) => {
    let errors = Object.values(err.errors).map((el) => el.message);

    if (errors.length > 1) {
        let chain = "";

        for (let i = 0; i < errors.length; i++) {
            chain += errors[i] + " || ";
        }

        const string = chain.slice(0, -4);

        res.status(400).send({ messages: string });
    } else {
        res.status(400).send({ message: errors });
    }
};

const typeError = (err, req, res, next) => {
    if (err.name === "ValidationError")
        return (err = handleValidationError(err, res));
    else if (err.code === 11000) {
        if (Object.keys(err.keyValue)[0] === "email") {
            res.status(400).send({
                ok: false,
                errors: [
                    {
                        msg: "Email already in use",
                        param: "email",
                        location: "body",
                    },
                ],
            });
        } else {
            res.status(400).send({
                ok: false,
                errors: [
                    {
                        msg: "Username already in use",
                        param: "username",
                        location: "body",
                    },
                ],
            });
        }
    } else {
        res.status(500).send({ msg: `Hubo un problema` });
    }
};

module.exports = { typeError };

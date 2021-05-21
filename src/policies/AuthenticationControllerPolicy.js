const Joi = require("joi");

module.exports = {
  addUser(req, res, next) {
    const schema = Joi.object({
      username: Joi.string(),
      password: Joi.string().regex(new RegExp("^[a-zA-Z0-9]{8,32}$")),
      email: Joi.string().email(),
      contactnumber: Joi.string().regex(new RegExp("[0-9]{3}-[0-9]{7,8}")),
      role: Joi.string()
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      switch (error.details[0].context.key) {
        case "email":
          res
            .status(400)
            .send({ error: "You must provide a valid email address" });
          break;

        case "password":
          res.status(400).send({
            error:
              "Password must only contain: <br> 1. upper/lowercase or numbers <br> 2. minimum of 8 characters "
          });

          break;

        default:
      }
    } else {
      next();
    }
  },

  change(req, res, next) {
    console.log("inside policy");
    const schema = Joi.object({
      username: Joi.string(),
      password: Joi.string().regex(new RegExp("^[a-zA-Z0-9]{8,32}$")),
      newPassword: Joi.string().regex(new RegExp("^[a-zA-Z0-9]{8,32}$")),
      confirmPassword: Joi.string().regex(new RegExp("^[a-zA-Z0-9]{8,32}$"))
    });

    const { error } = schema.validate(req.body);

    if (error) {
      switch (error.details[0].context.key) {
        case "newPassword":
          res.status(400).send({
            error:
              "Password must only contain: <br> 1. upper/lowercase or numbers <br> 2. minimum of 8 characters"
          });

          break;

        default:
      }
    } else {
      next();
    }
  }
};

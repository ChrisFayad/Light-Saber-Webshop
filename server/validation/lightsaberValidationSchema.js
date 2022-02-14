const Joi = require("joi");

const lightsaberValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().lowercase().required(),
  available: Joi.number().integer().min(0).required(),
  crystal: Joi.array().items(
    Joi.object({
      name: Joi.string().lowercase().required(),
      color: Joi.string()
        .valid("green", "red", "blue", "purple")
        .lowercase()
        .required(),
    })
  ),
});

module.exports = lightsaberValidationSchema;

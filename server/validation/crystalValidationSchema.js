const Joi = require("joi");

const crystalValidationSchema = Joi.object({
  name: Joi.string().alphanum().lowercase().required(),
  color: Joi.string()
    .valid("green", "red", "blue", "purple")
    .lowercase()
    .required(),
  mode: Joi.string(),
  f: Joi.number().integer().required(),
  cr: Joi.number().integer().required(),
});

module.exports = crystalValidationSchema;

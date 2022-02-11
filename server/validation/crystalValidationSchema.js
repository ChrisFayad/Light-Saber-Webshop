const Joi = require("joi");

const crystalValidationSchema = Joi.object({
  name: Joi.string().alphanum().lowercase().required(),
  color: Joi.string().valid("Green", "Red", "Blue", "Purple").required(),
  mode: Joi.string(),
  f: Joi.number().integer().required(),
  cr: Joi.number().integer().required(),
});

module.exports = crystalValidationSchema;

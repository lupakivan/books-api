const Joi = require('@hapi/joi');

const nameSchema = Joi.string().min(3).max(50);
const releaseDateSchema = Joi.date().timestamp();
const authorNameSchema = Joi.string().min(2).max(30)

module.exports.uuid = Joi.string().guid({ version: 'uuidv4' }).label('uuid');

module.exports.bookCreateObject = Joi.object({
  name: nameSchema.required(),
  releaseDate: releaseDateSchema.required(),
  authorName: authorNameSchema.required(),
});

module.exports.bookUpdateObject = Joi.object({
  name: nameSchema,
  releaseDate: releaseDateSchema,
  authorName: authorNameSchema,
});

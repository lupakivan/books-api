const Joi = require('@hapi/joi');

module.exports.uuid = Joi.string().guid({ version: 'uuidv4' }).label('uuid');

module.exports.bookCreateObject = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  releaseDate: Joi.date().timestamp().required(),
  authorName: Joi.string().min(2).max(30).required(),
});

module.exports.bookUpdateObject = Joi.object({
  name: Joi.string().min(3).max(50),
  releaseDate: Joi.date().timestamp(),
  authorName: Joi.string().min(2).max(30),
});

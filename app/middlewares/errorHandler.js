const HttpStatus = require('http-status-codes');
const Joi = require('@hapi/joi');

const logger = require('../utils/logger');

module.exports = async function handleError(ctx, next) {
  try {
    await next();
  } catch (err) {
    logger.error(err);

    if (err instanceof Joi.ValidationError) {
      ctx.status = HttpStatus.BAD_REQUEST;
      ctx.body = { error: err.details[0].message };
      return;
    }

    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.status = statusCode;
    ctx.body = { error: HttpStatus.getStatusText(statusCode) };
  }
};

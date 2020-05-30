const { createLogger, format, transports } = require('winston');

const { combine, timestamp, prettyPrint } = format;

module.exports = createLogger({
  format: combine(
    timestamp(),
    prettyPrint(),
  ),
  transports: [
    new transports.Console(),
  ],
});

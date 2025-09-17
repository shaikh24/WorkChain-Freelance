  GNU nano 8.6           logger.js
// Simple pino logger wrapper
const pino = require('pino');
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
<' ? { target: 'pino-pretty' } : undefined
});
module.exports = logger;

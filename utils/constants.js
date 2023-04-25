const rateLimiter = require('express-rate-limit');

const urlRegEx = /^(https?:\/\/)(www\.)?([\w-._~:/?#[\]@!$&'()*+,;=]+\.)+[\w-._~:/?#[\]@!$&'()*+,;=]+#?$/;
const NODE_ENV_DEV = require('crypto').randomBytes(32).toString('hex');

const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports = {
  urlRegEx,
  NODE_ENV_DEV,
  limiter,
};

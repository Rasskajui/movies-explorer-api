const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const { NODE_ENV_DEV } = require('../utils/constants');
const { UnauthorizedError } = require('../utils/errors');
const { unauthorizedErrorMessage } = require('../utils/messages');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(unauthorizedErrorMessage));
  }
  let payload;
  const token = authorization.replace('Bearer ', '');
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : NODE_ENV_DEV);
  } catch (err) {
    next(new UnauthorizedError(unauthorizedErrorMessage));
  }
  req.user = payload;
  next();
};

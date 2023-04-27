const { defaultErrorMessage } = require('../utils/messages');

module.exports = (err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).send({ message: status === 500 ? defaultErrorMessage : message });
  next();
};

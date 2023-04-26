const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');
const { NODE_ENV_DEV } = require('../utils/constants');
const { NotFoundError, BadRequestError, ConflictError } = require('../utils/errors');
const {
  userConflictMessage,
  userNotFoundMessage,
  userSignupBadRequestMessage,
  userUpdateBadRequestMessage,
} = require('../utils/messages');

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        next(new NotFoundError(userNotFoundMessage));
      }
    })
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        next(new NotFoundError(userNotFoundMessage));
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(userUpdateBadRequestMessage));
      } else if (err.code === 11000) {
        next(new ConflictError(userConflictMessage));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => {
      const userObject = user.toObject();
      delete userObject.password;
      res.send(userObject);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(userConflictMessage));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(userSignupBadRequestMessage));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : NODE_ENV_DEV, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

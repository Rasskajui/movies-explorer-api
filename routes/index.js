const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const moviesRouter = require('./movies');
const usersRouter = require('./users');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../utils/errors');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);
router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use((req, res, next) => {
  next(new NotFoundError('Неправильный путь'));
});

module.exports = router;

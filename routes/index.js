const router = require('express').Router();
const moviesRouter = require('./movies');
const usersRouter = require('./users');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../utils/errors');
const { createUserValidation, loginValidation } = require('../utils/validation');
const { pathNotFoundMessage } = require('../utils/messages');

router.post('/signin', loginValidation, login);
router.post('/signup', createUserValidation, createUser);
router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use((req, res, next) => {
  next(new NotFoundError(pathNotFoundMessage));
});

module.exports = router;

const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');
const { urlRegEx } = require('../utils/constants');

router.get('/', getMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(urlRegEx),
    trailerLink: Joi.string().required().regex(urlRegEx),
    thumbnail: Joi.string().required().regex(urlRegEx),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), addMovie);
router.delete('/:id', deleteMovie);

module.exports = router;

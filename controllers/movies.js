const Movie = require('../models/movie');
const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require('../utils/errors');
const {
  movieBadRequestMessage,
  movieDeletedMessage,
  movieForbiddenMessage,
  movieNotFoundMessage,
} = require('../utils/messages');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((savedMovies) => res.send(savedMovies))
    .catch(next);
};

module.exports.addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((newMovie) => res.send(newMovie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(movieBadRequestMessage));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id).populate('owner')
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError(movieNotFoundMessage));
      } else if (movie.owner._id.toString() !== req.user._id) {
        next(new ForbiddenError(movieForbiddenMessage));
      } else {
        Movie.findByIdAndDelete(id)
          .then(() => res.send({ message: movieDeletedMessage }))
          .catch(next);
      }
    })
    .catch(next);
};

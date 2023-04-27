const router = require('express').Router();
const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');
const { addMovieValidation, deleteMovieValidation } = require('../utils/validation');

router.get('/', getMovies);
router.post('/', addMovieValidation, addMovie);
router.delete('/:id', deleteMovieValidation, deleteMovie);

module.exports = router;

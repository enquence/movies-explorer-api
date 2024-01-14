const router = require('express').Router();
const { celebrate } = require('celebrate');
const { getMovies, saveMovie, removeMovie } = require('../controllers/movies');
const { requestRules } = require('../utils/req-rules');

router.get('/', getMovies);
router.post('/', celebrate(requestRules.movieBodyFields), saveMovie);
router.delete('/:movieId', celebrate(requestRules.movieParamsId), removeMovie);

module.exports = router;

const { StatusCodes } = require('http-status-codes');
const movieModel = require('../models/movie');
const { NotFoundError, ForbiddenError } = require('../utils/errors');
const { requestMessages } = require('../utils/vocabulary');

module.exports.getMovies = (req, res, next) => {
  movieModel.find({ owner: req.user._id })
    .then((movies) => res.status(StatusCodes.OK).send(movies))
    .catch(next);
};

module.exports.saveMovie = (req, res, next) => {
  movieModel.create(req.body)
    .then((movie) => res.status(StatusCodes.CREATED).send(movie))
    .catch(next);
};

module.exports.removeMovie = (req, res, next) => {
  movieModel.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) return Promise.reject(new NotFoundError(requestMessages.MOVIE_ID_NOTFOUND));
      if (!movie?.owner.equals(req.user._id)) {
        return Promise.reject(new ForbiddenError(requestMessages.MOVIE_DELETE_FORBIDDEN));
      }
      return movieModel.findByIdAndDelete(req.params.movieId);
    })
    .then(() => res.status(StatusCodes.OK).send({ message: requestMessages.MOVIE_DELETE_OK }))
    .catch(next);
};

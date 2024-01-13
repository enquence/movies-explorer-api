const mongoose = require('mongoose');
const validator = require('validator');
const { validateMassages } = require('../utils/vocabulary');

const MovieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, validateMassages.fieldRequired('country')],
  },
  director: {
    type: String,
    required: [true, validateMassages.fieldRequired('director')],
  },
  duration: {
    type: Number,
    required: [true, validateMassages.fieldRequired('duration')],
  },
  year: {
    type: String,
    required: [true, validateMassages.fieldRequired('year')],
  },
  description: {
    type: String,
    required: [true, validateMassages.fieldRequired('description')],
  },
  image: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: validateMassages.BAD_URL,
    },
    required: [true, validateMassages.fieldRequired('image')],
  },
  trailerLink: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: validateMassages.BAD_URL,
    },
    required: [true, validateMassages.fieldRequired('trailerLink')],
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: validateMassages.BAD_URL,
    },
    required: [true, validateMassages.fieldRequired('thumbnail')],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, validateMassages.fieldRequired('owner')],
  },
  movieId: {
    type: Number,
    required: [true, validateMassages.fieldRequired('movieId')],
  },
  nameRU: {
    type: String,
    required: [true, validateMassages.fieldRequired('nameRU')],
  },
  nameEN: {
    type: String,
    required: [true, validateMassages.fieldRequired('nameEN')],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', MovieSchema);

const mongoose = require('mongoose');
const validator = require('validator');
const { validateMassages } = require('../utils/vocabulary');

const MovieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, validateMassages.FIELD_REQUIRED],
  },
  director: {
    type: String,
    required: [true, validateMassages.FIELD_REQUIRED],
  },
  duration: {
    type: Number,
    required: [true, validateMassages.FIELD_REQUIRED],
  },
  year: {
    type: String,
    required: [true, validateMassages.FIELD_REQUIRED],
  },
  description: {
    type: String,
    required: [true, validateMassages.FIELD_REQUIRED],
  },
  image: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: validateMassages.BAD_URL,
    },
    required: [true, validateMassages.FIELD_REQUIRED],
  },
  trailerLink: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: validateMassages.BAD_URL,
    },
    required: [true, validateMassages.FIELD_REQUIRED],
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v),
      message: validateMassages.BAD_URL,
    },
    required: [true, validateMassages.FIELD_REQUIRED],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, validateMassages.FIELD_REQUIRED],
  },
  movieId: {
    type: Number,
    required: [true, validateMassages.FIELD_REQUIRED],
  },
  nameRU: {
    type: String,
    required: [true, validateMassages.FIELD_REQUIRED],
  },
  nameEN: {
    type: String,
    required: [true, validateMassages.FIELD_REQUIRED],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', MovieSchema);

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { AuthError } = require('../utils/errors');
const { validateMassages, requestMessages } = require('../utils/vocabulary');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: validateMassages.BAD_EMAIL,
    },
    required: [true, validateMassages.FIELD_REQUIRED],
    unique: [true, validateMassages.DUPLICATE_EMAIL],
  },
  password: {
    type: String,
    required: [true, validateMassages.FIELD_REQUIRED],
    select: false,
  },
  name: {
    type: String,
    required: [true, validateMassages.FIELD_REQUIRED],
    minLength: [2, validateMassages.minFieldLength(2)],
    maxLength: [30, validateMassages.maxFieldLength(30)],
  },
}, { versionKey: false });

UserSchema.statics.findUserByCredentials = function _(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) return Promise.reject(new AuthError(requestMessages.AUTH_FAILED));
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) return Promise.reject(new AuthError(requestMessages.AUTH_FAILED));
          return user;
        });
    });
};

module.exports = mongoose.model('user', UserSchema);

const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const { NotFoundError, BadRequestError } = require('../utils/errors');
const { requestMessages } = require('../utils/vocabulary');
const { secretKeyModeDependent } = require('../utils/constants');

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => userModel.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }))
    .then(({ _id, email, name }) => res.status(StatusCodes.CREATED).send({ _id, email, name }))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return userModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        secretKeyModeDependent,
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, { maxAge: 3600000, httpOnly: true, sameSite: true }).status(StatusCodes.OK).end();
    })
    .catch(next);
};

module.exports.logout = (req, res) => res.clearCookie('jwt').status(StatusCodes.OK).end();

module.exports.getUserInfo = (req, res, next) => userModel.findById(req.user._id)
  .then((user) => res.status(StatusCodes.OK).send(user))
  .catch(next);

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  if (!name && !email) {
    return next(new BadRequestError(requestMessages.USER_UPDATE_BADREQUEST));
  }
  return userModel.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) return Promise.reject(new NotFoundError(requestMessages.USER_NOTFOUND));
      return res.status(StatusCodes.OK).send(user);
    })
    .catch(next);
};

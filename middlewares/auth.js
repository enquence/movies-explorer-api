require('dotenv').config();
const jwt = require('jsonwebtoken');
const { AuthError } = require('../utils/errors');
const { requestMessages } = require('../utils/vocabulary');
const { secretKeyModeDependent } = require('../utils/constants');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) throw new AuthError(requestMessages.AUTH_REQUIRED);
  const token = req.cookies.jwt;

  let payload;
  try {
    payload = jwt.verify(token, secretKeyModeDependent);
  } catch {
    throw new AuthError(requestMessages.AUTH_REQUIRED);
  }

  req.user = payload;
  return next();
};

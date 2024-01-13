const { Joi } = require('celebrate');

const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{2,}$/;
const urlPattern = /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,}\.[a-z]{2,6}\b([-a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*#?$)/;

const requestRules = {
  userAuthBody: {
    body: Joi.object().keys({
      email: Joi.string().required().pattern(emailPattern),
      password: Joi.string().required().pattern(passwordPattern),
    }),
  },
  userUpdateBody: {
    body: Joi.object().keys({
      email: Joi.string().pattern(emailPattern),
      name: Joi.string(),
    }),
  },
  movieParamsId: {
    params: Joi.object().keys({
      movieId: Joi.string().required().hex().length(24),
    }),
  },
  movieBodyFields: {
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(urlPattern),
      trailerLink: Joi.string().required().pattern(urlPattern),
      thumbnail: Joi.string().required().pattern(urlPattern),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  },
};

module.exports = { requestRules };

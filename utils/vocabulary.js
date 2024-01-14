require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const requestMessages = {
  NONEXISTEND_ENDPOINT: 'Несуществующий адрес запроса',
  MOVIE_ID_NOTFOUND: 'Несуществующий ID фильма',
  MOVIE_DELETE_FORBIDDEN: 'Невозможно удалить фильм другого пользователя',
  MOVIE_DELETE_OK: 'Фильм удален',
  USER_UPDATE_BADREQUEST: 'Доступные для обновления поля: "name" и "email"',
  USER_NOTFOUND: 'Запрашиваемый пользователь не найден',
  AUTH_REQUIRED: 'Необходима авторизация',
  AUTH_FAILED: 'Неправильные почта или пароль',
  SERVER_ERROR: 'На сервере произошла ошибка',
};

const validateMassages = {
  maxFieldLength: (length) => `Максимальная длина поля - ${length}`,
  minFieldLength: (length) => `Минимальная длина поля - ${length}`,
  FIELD_REQUIRED: 'Поле должно быть заполнено',
  BAD_URL: 'Некорректный адрес ссылки',
  BAD_EMAIL: 'Некорректный адрес почты',
  DUPLICATE_EMAIL: 'Адрес почты уже зарегистрирован',
};

const secretKeyModeDependent = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

module.exports = { requestMessages, secretKeyModeDependent, validateMassages };

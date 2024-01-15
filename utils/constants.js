require('dotenv').config();

const { NODE_ENV, JWT_SECRET, DB } = process.env;

const secretKeyModeDependent = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
const dbConnection = NODE_ENV === 'production' ? DB : 'mongodb://127.0.0.1:27017/bitfilmsdb';
const rateLimitOptions = {
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
};

module.exports = { dbConnection, secretKeyModeDependent, rateLimitOptions };

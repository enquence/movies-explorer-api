const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const helmet = require('helmet');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { rateLimit } = require('express-rate-limit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const generalErrors = require('./middlewares/general-errors');

const {
  PORT = 3000,
  DB_IP = '127.0.0.1',
  DB_PORT = 27017,
  DB_NAME = 'bitfilmsdb',
} = process.env;

mongoose.connect(`mongodb://${DB_IP}:${DB_PORT}/${DB_NAME}`);

const app = express();

// middlewares
app.use(requestLogger);
app.use(cors);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
}));

// routes
app.use(require('./routes'));

// errors
app.use(errorLogger);
app.use(errors());
app.use(generalErrors);

app.listen(PORT);

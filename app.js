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
const { dbConnection, rateLimitOptions } = require('./utils/constants');

const { PORT = 3000 } = process.env;

await mongoose.connect(dbConnection);

const app = express();

// middlewares
app.use(requestLogger);
app.use(cors);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(rateLimit(rateLimitOptions));

// routes
app.use(require('./routes'));

// errors
app.use(errorLogger);
app.use(errors());
app.use(generalErrors);

app.listen(PORT);

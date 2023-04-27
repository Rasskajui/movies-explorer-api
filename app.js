require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const { limiter, DB_URL_DEV } = require('./utils/constants');
const routes = require('./routes');
const errorsHandler = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const { PORT = 3000, DB_URL, NODE_ENV } = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? DB_URL : DB_URL_DEV, {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(cors);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT);

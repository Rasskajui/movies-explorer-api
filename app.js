require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const { limiter } = require('./utils/constants');
const routes = require('./routes');
const errorsHandler = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(requestLogger);
app.use(cors);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT);

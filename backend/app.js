const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('dotenv').config({path: './config/.env'});
require('./database/connection');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT} in ${process.env.NODE_ENV} mode.`)
});

module.exports = app;

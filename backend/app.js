const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('dotenv').config({path: './config/.env'});
require('./database/connection');

const productsRouter = require('../backend/routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const ordersRouter = require('./routes/ordersRouter');
const imagesRouter = require('./routes/imagesRouter');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.get('/config/paypal', (req, res) => {
    return res.send(process.env.PAYPAL_CLIENT_ID);
});

app.use(productsRouter);
app.use(usersRouter);
app.use(ordersRouter);
app.use(imagesRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT} in ${process.env.NODE_ENV} mode.`)
});

module.exports = app;

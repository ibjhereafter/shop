const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

require('dotenv').config({path: './config/.env'});
require('./database/connection');

const productsRouter = require('../backend/routes/productsRouter');
const usersRouter = require('./routes/usersRouter');
const ordersRouter = require('./routes/ordersRouter');
const imagesRouter = require('./routes/imagesRouter');


// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.get('/config/paypal', (req, res) => {
    return res.send(process.env.PAYPAL_CLIENT_ID);
});

app.use(productsRouter);
app.use(usersRouter);
app.use(ordersRouter);
app.use(imagesRouter);

if(process.env.NODE_ENV === 'development') {
    console.log('Hi')
    app.use(express.static(path.resolve(__dirname, '../frontend/build')));
    app.get("*", (req, res) => {
        return res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
    });

    app.get('/*', (req, res) => {
        // const index = path.resolve(__dirname, 'frontend','build', 'index.html');
        // res.sendFile(index);
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
    });

    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../frontend/build/index.html')), function(err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    });

    app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, '../frontend/build/index.html')), function(err) {
            if (err) {
                res.status(500).send(err)
            }
        }
    });
} else {
    app.use(express.static(path.resolve(__dirname, '../frontend/build/')));
    app.get('*', (req, res) => {
        console.log('hi')
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
    });
    app.get('/*', (req, res) => {
        console.log('hi')
        res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
    });
}

if (process.env.NODE_ENV === 'production') {

}




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT} in ${process.env.NODE_ENV} mode.`)
});

module.exports = app;

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const indexRouter = require('./routes/indexRouter');
const hbs = require('hbs');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
//uso de bodyParser para leer form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, '/views/partials'));


app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter);

module.exports = app;
/* globals __dirname */

const path = require('path');

const express = require('express');
const flash = require('express-flash');
const toastr = require('express-toastr');
const session = require('express-session');
const messages = require('express-messages');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const MongoStore = require('connect-mongo')(session);

const config = require('../../config/config');

const applyTo = (app) => {
    app.set('view engine', 'pug');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    const libsPath = path.join(__dirname, '../../node_modules/');
    app.use('/libs', express.static(libsPath));

    const staticsPath = path.join(__dirname, '../../static');
    app.use('/static', express.static(staticsPath));

      app.use(session({
        store: new MongoStore({ url: config.connectionString }),
        secret: config.sessionSecret,
        resave: true,
        saveUninitialized: true,
    }));

    app.use(cookieParser('keyboard cat'));

    app.use(flash());
    app.use((req, res, next) => {
        res.locals.messages = messages(req, res);
        next();
    });

    app.use(toastr());
    app.use((req, res, next) => {
        res.locals.toasts = req.toastr.render;
        next();
    });
};

module.exports = { applyTo };

/* globals __dirname */

const path = require('path');

const express = require('express');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const applyTo = (app) => {
    app.set('view engine', 'pug');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    const libsPath = path.join(__dirname, '../../node_modules/');
    app.use('/libs', express.static(libsPath));

    const staticsPath = path.join(__dirname, '../../static');
    app.use('/static', express.static(staticsPath));

    app.use(cookieParser('keyboard cat'));
};

module.exports = { applyTo };

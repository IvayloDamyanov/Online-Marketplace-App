/* eslint linebreak-style: ["error", "windows"]*/
/* globals __dirname */

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const init = (data) => {
    const app = express();

    // config 
    app.set('view-engine', 'pug');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/libs', express.static(path.join(__dirname, '../node_modules/')));

    return Promise.resolve(app);
};

module.exports = { init };

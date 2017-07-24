/* eslint linebreak-style: ["error", "windows"]*/

const { Router } = require('express');

const attachTo = function(app, data) {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/', function(req, res) {
            return controller.getHome(req, res);
        })
        .get('/ads', function(req, res) {
            return controller.requestAd(req, res);
        })
        .post('/ads', function(req, res) {
            return controller.createAd(req, res);
        })
        ;

    app.use('/adverts', router);
};

module.exports = { attachTo };

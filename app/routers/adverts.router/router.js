const { Router } = require('express');

const attachTo = function(app, data) {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/', function(req, res) {
            return controller.getHome(req, res);
        })
        .get('/ads', function(req, res) {
            console.log('yay');
            return controller.getAds(req, res);
        })
        .post('/ads', function(req, res) {
            return controller.createAd(req, res);
        })
        .get('/ads/:num', function(req, res) {
            return controller.getAd(req, res);
        })
        ;

    app.use('/adverts', router);
};

module.exports = { attachTo };

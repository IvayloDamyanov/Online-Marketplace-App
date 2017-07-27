const { Router } = require('express');
const auth = require('../../auth/auth');

const attachTo = function(app, data) {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/', function(req, res) {
            return controller.getHome(req, res);
        })
        .get('/ads', function(req, res) {
            return controller.getAds(req, res);
        })
        .post('/ads', auth.isAuthenticated, function(req, res) {
            return controller.createAd(req, res);
        })
        .get('/ads/:num', function(req, res) {
            return controller.getAd(req, res);
        })
        ;

    app.use('/adverts', router);
};

module.exports = { attachTo };

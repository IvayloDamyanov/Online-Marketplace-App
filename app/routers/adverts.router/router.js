const { Router } = require('express');
const auth = require('../../auth/auth');

const attachTo = function(app, data) {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
        .get('/ads', function(req, res) {
            return controller.getAds(req, res);
         })
        .get('/create', auth.isAuthenticated, function(req, res) {
            return controller.getCreate(req, res);
        })
        .get('/search', function(req, res) {
            return controller.getSearch(req, res);
        })
        .get('/all', function(req, res) {
            return controller.getCurrentAds(req, res);
        })
        .post('/ads', auth.isAuthenticated, function(req, res) {
            return controller.createAd(req, res);
        })
        .get('/:num', function(req, res) {
            return controller.getAd(req, res);
        });

    app.use('/adverts', router);
};

module.exports = { attachTo };

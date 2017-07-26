const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
       .get('/', (req, res) => {
           return controller.getHome(req, res);
       })
       .get('/users', (req, res) => {
           return controller.getUsers(req, res);
       })
       .post('/users/:id', (req, res) => {
           return controller.updateUser(req, res);
       });

    app.use('/settings', router);
};

module.exports = { attachTo };

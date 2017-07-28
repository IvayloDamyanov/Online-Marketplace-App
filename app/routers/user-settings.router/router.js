const { Router } = require('express');
const auth = require('../../auth/auth');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
       .get('/users', (req, res) => {
           return controller.getUsers(req, res);
       })
       .get('/updateProfile', (req, res) => {
           return controller.getUpdateProfile(req, res);
       })
       .post('/users/:id', (req, res) => {
           return controller.updateUser(req, res);
       })
       .delete('/users/:id', auth.isAuthenticated, (req, res) => {
           return controller.deleteCurrentUser(req, res);
       });

    app.use('/settings', router);
};

module.exports = { attachTo };

const auth = require('../../auth/auth');
const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();
    const controller = require('./controller').init(data);

    router
       .get('/', auth.isAuthenticated, controller.getMessageForm)
       .post('/', auth.isAuthenticated, controller.initializeMessage)
       .put('/', auth.isAuthenticated, controller.addMessage)
       .post('/texts', auth.isAuthenticated, controller.getTexts);

    app.use('/messages', router);
};

module.exports = { attachTo };

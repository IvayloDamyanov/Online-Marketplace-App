const express = require('express');

const init = (data) => {
    const app = express();

    require('./config').applyTo(app);
    require('./auth').applyTo(app, data);

    app.use(require('connect-flash')());
    app.use((req, res, next) => {
        res.locals.messages = require('express-messages')(req, res);
        next();
    });

    require('./routers').attachTo(app, data);

    const server = require('./config/socket.config')(app, data);

    return Promise.resolve(server);
};

module.exports = { init };

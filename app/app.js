/* eslint linebreak-style: ["error", "windows"]*/

const express = require('express');

const init = (data) => {
    const app = express();

    require('./config').applyTo(app);
    require('./auth').applyTo(app, data);

    app.use(require('connect-flash')());

    require('./routers').attachTo(app, data);

    return Promise.resolve(app);
};

module.exports = { init };

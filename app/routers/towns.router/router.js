const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();

    router
        .get('/', (req, res) => {
            return data.towns.getAll()
                .then((towns) => {
                    return res.send(towns);
                });
        });

    app.use('/towns', router);
};

module.exports = { attachTo };

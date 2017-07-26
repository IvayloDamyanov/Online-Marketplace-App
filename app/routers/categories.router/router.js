const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();

    router
        .get('/', (req, res) => {
            return data.categories.getAll()
                .then((adverts) => {
                    return res.send(adverts);
                });
        });

    app.use('/categories', router);
};

module.exports = { attachTo };

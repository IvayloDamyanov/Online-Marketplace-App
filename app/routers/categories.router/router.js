const { Router } = require('express');

const attachTo = (app, data) => {
    const router = new Router();

    router
        .get('/', (req, res) => {
            return data.categories.getAll()
                .then((categories) => {
                    return res.send(categories);
                });
        });

    app.use('/categories', router);
};

module.exports = { attachTo };

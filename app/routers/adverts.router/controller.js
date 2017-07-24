class AdvertsController {
    constructor(data) {
        this.data = data;
    }

    getHome(req, res) {
        return res.render('adverts/home');
    }

    getAd(req, res) {
        return res.render('adverts/ads', {
            // model: item,
        });
    }

    requestAd(req, res) {
        const model = req.body; // informaciqta ot poletata
        const items = this.data.adverts.filterBy(model);
        items.then((item) => {
            res.render('adverts/ads', { model: item });
        });
    }

    createAd(req, res) {
        const model = req.body;
        this.data.adverts.create(model);

        const item = {
            num: 1,
            name: 'Ime',
            town: 'Grad',
            category: 'Kategoria',
            description: 'Opisanie',
        }; // da go napravq da prenasochva obqvata
        return res.render('adverts/ads', {
            model: item,
        });
    }
}

const init = function(data) {
    return new AdvertsController(data);
};

module.exports = { init };

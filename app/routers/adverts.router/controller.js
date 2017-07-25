class AdvertsController {
    constructor(data) {
        this.data = data;
    }

    getHome(req, res) {
        return res.render('adverts/home');
    }

    getAd(req, res) {
        const num = req.params.num.slice(5, req.params.num.length);
        const items = this.data.adverts.findFirst(num);
        items.then((item) => {
            res.render('adverts/ad', { model: item });
        });
    }

    getAds(req, res) {
        const model = req.query; // informaciqta ot poletata
        const items = this.data.adverts.filterBy(model);
        items.then((item) => {
            res.render('adverts/ads', { model: item });
        });
    }

    createAd(req, res) {
        const model = req.body;
        const num = model.num;
        const items = this.data.adverts.findFirst(num);

        items.then((item) => {
            if (item) {
                this.data.adverts.updateById(item, model);
            } else {
                this.data.adverts.create(model);
            }
            return res.render('adverts/home');
        });
    }
}

const init = function(data) {
    return new AdvertsController(data);
};

module.exports = { init };

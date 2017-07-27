class AdvertsController {
    constructor(data) {
        this.data = data;
    }

    getAd(req, res) {
        const num = req.params.num.slice(5, req.params.num.length);
        const items = this.data.adverts.findFirst(num);
        items.then((item) => {
            res.render('adverts/ad', { model: item });
        });
    }

    getCreate(req, res) {
        return res.render('adverts/create');
    }

    getSearch(req, res) {
        return res.render('adverts/search');
    }

    getAds(req, res) {
        const model = req.query; // informaciqta ot poletata
        const items = this.data.adverts.filterDataBy(model);
        items.then((item) => {
            res.render('adverts/ads', { model: item });
        });
    }

    getCurrentAds(req, res) {
        this.data.adverts.getAllAds()
          .then((ad) => {
              return res.render('adverts/all', { model: ad });
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
            return res.redirect('/');
        });
    }
}

const init = function(data) {
    return new AdvertsController(data);
};

module.exports = { init };

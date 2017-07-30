class AdvertsController {
    constructor(data) {
        this.data = data;
    }

    getCreate(req, res) {
        return res.render('adverts/create');
    }

    getSearch(req, res) {
        return res.render('adverts/search');
    }

    addToFav(req, res) {
        const num = req.body.num;
        const id = req.user._id;
        const items = this.data.adverts.findByNum(num);

        items.then((item) => {
            const users = this.data.users.findById(id);
            users.then((user) => {
                this.data.adverts.addToFav(user, item);
            });
        });
    }

    getFav(req, res) {
        const favourites = req.user.favourites;
        return res.render('adverts/favs', { model: favourites });
    }

    deleteFav(req, res) {
        const num = req.body.num;
        const id = req.user._id;
        const items = this.data.adverts.findByNum(num);

        items.then((item) => {
            const users = this.data.users.findById(id);
            users.then((user) => {
                this.data.adverts.removeFromFav(user, item);
            });
        });
    }

    getAd(req, res) {
        const num = req.params.num.slice(5, req.params.num.length);
        const items = this.data.adverts.findByNum(num);
        items.then((item) => {
            res.render('adverts/ad', { model: item });
        });
    }

    getAds(req, res) {
        const model = req.query;
        const items = this.data.adverts.filterDataBy(model);

        return items.then((item) => {
            return res.render('adverts/ads', { model: item });
        });
    }

    createOrUpdateAd(req, res) {
        const model = req.body;

        const num = model.num;
        const items = this.data.adverts.findByNum(num);
        const status = {};

        items.then((item) => {
            if (item) {
                status.num = item.num;
                if (this.isOwner(item, req)) {
                    this.data.adverts.updateById(item, model);
                    status.msg = 'updated';
                } else {
                    status.msg = 'not updated. '
                                + 'You are not the owner of this ad';
                }
            } else {
                model.owner = req.user._id;
                this.data.adverts.create(model);
                status.num = model.num;
                status.msg = 'created';
            }
            return res.render('adverts/status', { model: status });
        });
    }

    deleteAd(req, res) {
        const num = req.body.num;
        this.data.adverts.deleteAd(num)
            .then(() => {
                res.status(200).json({
                    redirect: 'adverts/ads',
                });
            })
            .catch((err) => {
                req.flash('error', err);
                return res.send(err);
            });
    }

    isOwner(item, req) {
        if (String(item.owner) === String(req.user._id)) {
            return true;
        }
        return false;
    }
}

const init = function(data) {
    return new AdvertsController(data);
};

module.exports = { init };

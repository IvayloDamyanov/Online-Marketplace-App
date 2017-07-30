const Advert = require('../models/advert.model');
const BaseData = require('./base/base.data');
const UserData = require('./users.data');

class AdvertData extends BaseData {
    constructor(db) {
        super(db, Advert, Advert);
    }

    addToFav(target, fav) {
        const userData = new UserData(this.db);
        return userData.findByUsername(target.username)
            .then((user) => {
                if (!user) {
                    throw new Error('Invalid user !');
                }

                return userData.collection.updateOne({
                        username: user.username,
                }, { $push: { 'favourites': fav } },
                { upsert: true });
            });
    }

    removeFromFav(target, fav) {
        const userData = new UserData(this.db);
        return userData.findByUsername(target.username)
            .then((user) => {
                if (!user) {
                    throw new Error('Invalid user !');
                }

                return userData.collection.updateOne({
                        username: user.username,
                }, { $pull: { 'favourites': fav } },
                { upsert: true });
            });
    }

    filterBuilder(props) {
        const filter = {};
        if (props.num.length > 0) {
            filter.num = props.num;
        }
        if (props.name.length > 0) {
            filter.name = props.name;
        }
        if (props.town.length > 0) {
            filter.town = props.town;
        }
        if (props.category.length > 0) {
            filter.category = props.category;
        }
        return filter;
    }

    findByNum(num) {
        return this.collection.findOne({
            num: num,
        });
    }

    deleteAd(num) {
        return this.collection.remove({
            num: num,
        }, {
            justOne: true,
        });
    }

    findFirst(props) {
        return this.collection.findOne({ num: props });
    }

    filterDataBy(props) {
        const query = this.filterBuilder(props);
        return this.collection.find(query).toArray();
    }

    getAllAds() {
        return this.getAll();
    }
}

module.exports = AdvertData;

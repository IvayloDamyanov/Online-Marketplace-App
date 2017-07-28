const Advert = require('../models/advert.model');
const BaseData = require('./base/base.data');

class AdvertData extends BaseData {
    constructor(db) {
        super(db, Advert, Advert);
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
        filter.isDeleted = false;
        return filter;
    }

    updateIsDeletedProperty(ad) {
        return this.collection.update(
            { num: ad.num },
            { num: ad.num,
              name: ad.name,
              town: ad.town,
              category: ad.category,
              isDeleted: true },
            { upsert: true });
    }

    findByNum(num) {
        return this.collection.findOne({
            num: num,
        });
    }

    deleteAd(num) {
        return this.findByNum(num)
            .then((ad) => {
                return this.updateIsDeletedProperty(ad);
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

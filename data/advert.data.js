const Advert = require('../models/advert.model');
const BaseData = require('./base/base.data');

class AdvertData extends BaseData {
    constructor(db) {
        super(db, Advert, Advert);
    }

    queryBuilder(props) {
        const query = {};
        if (props.num.length > 0) {
            query.num = props.num;
        }
        if (props.name.length > 0) {
            query.name = props.name;
        }
        if (props.town.length > 0) {
            query.town = props.town;
        }
        if (props.category.length > 0) {
            query.category = props.category;
        }
        return query;
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
        const query = this.queryBuilder(props);
        return this.collection.find(query).toArray();
    }

    getAllAds() {
        return this.getAll();
    }
}

module.exports = AdvertData;

/* eslint linebreak-style: ["error", "windows"]*/

const Advert = require('../models/advert.model');
const BaseData = require('./base/base.data');

class AdvertData extends BaseData {
    constructor(db) {
        super(db, Advert, Advert);
    }
}

module.exports = AdvertData;

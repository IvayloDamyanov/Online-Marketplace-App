/* eslint linebreak-style: ["error", "windows"]*/

const Town = require('../models/town.model');
const BaseData = require('./base/base.data');

class TownData extends BaseData {
    constructor(db) {
        super(db, Town, Town);
    }
}

module.exports = TownData;

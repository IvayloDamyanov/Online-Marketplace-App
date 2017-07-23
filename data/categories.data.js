/* eslint linebreak-style: ["error", "windows"]*/

const Category = require('../models/category.model');
const BaseData = require('./base/base.data');

class CategoryData extends BaseData {
    constructor(db) {
        super(db, Category, Category);
    }
}

module.exports = CategoryData;

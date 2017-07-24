const BaseData = require('./base/base.data');

const validator = {
    // Validate
    isValid() {
        return true;
    },
};

class CategoryData extends BaseData {
    constructor(db) {
        super(db, { name: 'Category' }, validator);
    }
}

module.exports = CategoryData;

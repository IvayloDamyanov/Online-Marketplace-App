const BaseData = require('./base/base.data');

const validator = {
    // Validate
    isValid() {
        return true;
    },
};

class TownData extends BaseData {
    constructor(db) {
        super(db, { name: 'Town' }, validator);
    }
}

module.exports = TownData;

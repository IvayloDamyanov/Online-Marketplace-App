const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../data/base/base.data');

describe('BaseData.updateById()', () => {
    const db = {
        collection: () => {},
    };
    let items = [];

    let ModelClass = null;
    const validator = null;
    let data = null;

    const updateOne = () => {

    };

    describe('when there are items in db', () => {
        describe('with default toViewModel', () => {
            beforeEach(() => {
                items = [1, 2, 3];
                sinon.stub(db, 'collection')
                     .callsFake(() => {
                         return { updateOne };
                     });
                ModelClass = class {
                };

                // Arrange
                data = new BaseData(db, ModelClass, validator);
                sinon.stub(data, '_isModelValid')
                     .callsFake(() => {
                         return true;
                     });
            });

            afterEach(() => {
                db.collection.restore();
                data._isModelValid.restore();
            });
        });
    });
});

const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../data/base/base.data');

describe('BaseData.create()', () => {
    const db = {
        collection: () => {},
    };
    let items = [];

    let ModelClass = null;
    const validator = null;
    let data = null;

    const insert = (item) => {
        items.push(item);
        return Promise.resolve(item);
    };

    describe('when there are items in db', () => {
        describe('with default toViewModel', () => {
            beforeEach(() => {
                items = [1, 2, 3];
                sinon.stub(db, 'collection')
                     .callsFake(() => {
                         return { insert };
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

            it('expect create to return created model', () => {
                const model = 4;
                return data.create(model)
                          .then((result) => {
                              expect(items).to.include(result);
                          });
            });
        });

        describe('with default toViewModel and invalid model', () => {
            beforeEach(() => {
                items = [1, 2, 3];
                sinon.stub(db, 'collection')
                     .callsFake(() => {
                         return { insert };
                     });
                ModelClass = class {
                };

                // Arrange
                data = new BaseData(db, ModelClass, validator);
                sinon.stub(data, '_isModelValid')
                     .callsFake(() => {
                         return false;
                     });
            });

            afterEach(() => {
                db.collection.restore();
                data._isModelValid.restore();
            });

            it('expect create to return promise reject', () => {
                const model = 'abc';
                try {
                    data.create(model);
                } catch (err) {
                    expect(err.message).to.include('failed');
                }
            });
        });
    });
});

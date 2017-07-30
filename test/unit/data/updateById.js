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

    const updateOne = (item, model) => {
        const itm = items.find((x) => x._id === item._id);
        for (const prop in itm) {
            if (model[prop]) {
                itm[prop] = model[prop];
            }
        }

        return itm;
    };

    describe('when there are items in db', () => {
        describe('with default toViewModel', () => {
            beforeEach(() => {
                items = [{ _id: 1, value: 1 }, { _id: 2, value: 2 }];

                sinon.stub(db, 'collection')
                     .callsFake(() => {
                         return { updateOne };
                     });
                ModelClass = class {
                };

                // Arrange
                data = new BaseData(db, ModelClass, validator);
            });

            afterEach(() => {
                db.collection.restore();
            });

            it('expect to update the id', () => {
                const item = { _id: 2, value: 3 };
                const res = data.updateById(item, item);
                expect(res).to.be.deep.equal(item);
            });
        });
        describe('with default toViewModel', () => {
            beforeEach(() => {
                items = [{ _id: 1, value: 1 }, { _id: 2, value: 2 }];

                sinon.stub(db, 'collection')
                     .callsFake(() => {
                         return { updateOne };
                     });
                ModelClass = class {
                };

                // Arrange
                data = new BaseData(db, ModelClass, validator);
            });

            afterEach(() => {
                db.collection.restore();
            });

            it('expect UpdateById to throw', () => {
                const item = { _id: 2, value: 3 };
                // eslint-disable-next-line
                const model = undefined;
                try {
                    data.updateById(item, model);
                } catch (err) {
                    expect(err.message).to.include('is undefined');
                }
            });
        });
    });
});

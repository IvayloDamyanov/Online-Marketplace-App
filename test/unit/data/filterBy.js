const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../data/base/base.data');

describe('BaseData.filterBy()', () => {
    const db = {
        collection: () => {},
    };
    let items = [];

    let ModelClass = null;
    const validator = null;
    let data = null;

    const toArray = () => {
        return Promise.resolve(items);
    };

    const find = () => {
        return {
            toArray,
        };
    };

    describe('when there are items in db', () => {
        describe('with default toViewModel', () => {
            beforeEach(() => {
                items = [1, 2, 3];
                sinon.stub(db, 'collection')
                     .callsFake(() => {
                         return { find };
                     });
                ModelClass = class {
                };

                // Arrange
                data = new BaseData(db, ModelClass, validator);
            });

            afterEach(() => {
                db.collection.restore();
            });

            it('expect filterBy to return filtered items', () => {
                const props = {};
                return data.filterBy(props)
                          .then((result) => {
                              data.collection.find(props).toArray()
                                  .then((expected) => {
                                      expect(result).to.deep.equal(expected);
                                  });
                          });
            });
        });
    });
});

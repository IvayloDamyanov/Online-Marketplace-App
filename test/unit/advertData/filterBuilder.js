const { expect } = require('chai');
const sinon = require('sinon');

const AdvertData = require('../../../data/advert.data');
const Advert = require('../../../models/advert.model');

describe('AdvertData.filterBuilder', () => {
    const db = {
        collection: () => {},
    };
    let data = null;

    describe('when there are items in db', () => {
        beforeEach(() => {
                // Arrange
                data = new AdvertData(db, Advert, Advert);
        });

        it('expect to build the filter successfully', () => {
            const props = {
                num: '1',
                name: 'Football ball',
                town: 'Sofia',
                category: 'Sport',
            };

            const result = data.filterBuilder(props);
            expect(props).to.deep.equal(result);
        });
    });
});

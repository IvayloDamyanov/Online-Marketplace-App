const { expect } = require('chai');
const Advert = require('../../../models/advert.model');

describe('AdvertModel.setId and GetId', () => {
    it('gets the advert id', () => {
         const advert = new Advert();
         const result = advert.id;
         expect(result).to.equal(advert._id);
    });

    it('sets the advert id', () => {
         const advert = new Advert();
         advert.id = 5;
         expect(5).to.equal(advert._id);
    });

    describe('with valid model', () => {
         it('returns true with valid model', () => {
             const model = {
               name: 'Football ad',
             };

             const result = Advert.isValid(model);
             expect(result).to.equal(true);
         });
    });
     describe('with invalid model', () => {
         it('returns false with invalid model', () => {
             const model = {
               name: 'ad',
             };

             const result = Advert.isValid(model);
             expect(result).to.equal(false);
         });
    });
    describe('with valid model makes toViewModel', () => {
         it('returns toViewModel', () => {
             const model = {
               name: 'Football ad',
             };

             const result = Advert.toViewModel(model);
             expect(result).to.deep.equal(model);
         });
    });
});

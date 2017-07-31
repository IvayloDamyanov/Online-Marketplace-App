const { expect } = require('chai');
const User = require('../../../models/user.model');

describe('UserModel.setId and GetId', () => {
    it('gets the user id', () => {
         const user = new User();
         const result = user.id;
         expect(result).to.equal(user._id);
    });

    describe('with valid model', () => {
         it('returns true with valid model', () => {
             const model = {
               username: 'Pesho123',
               password: '123456',
             };

             const result = User.isValid(model);
             expect(result).to.equal(true);
         });
    });
     describe('with invalid model', () => {
         it('returns false with invalid model', () => {
             const model = {
               username: 'Pesho123',
               password: '123',
             };

             const result = User.isValid(model);
             expect(result).to.equal(false);
         });
    });
    describe('with valid model makes toViewModel', () => {
         it('returns toViewModel', () => {
             const model = {
               username: 'Pesho123',
               password: '123',
             };

             const result = User.toViewModel(model);
             expect(result).to.deep.equal(model);
         });
    });
});

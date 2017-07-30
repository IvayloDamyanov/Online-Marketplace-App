const { expect } = require('chai');
const sinon = require('sinon');

const UserData = require('../../../data/users.data');
const User = require('../../../models/user.model');
const encrypted = require('../../../utils/encryption');
const encrypt = encrypted.encrypt;

describe('UserData.CheckPassword', () => {
    const db = {
        collection: () => {},
    };
    let data = null;

    describe('when there are items in db', () => {
        beforeEach(() => {
                // Arrange
                data = new UserData(db, User, User);

                sinon.stub(data, 'findByUsername')
                     .callsFake(() => {
                         return Promise.resolve({
                             username: 'Pesho',
                             password: 'pass',
                             salt: '123',
                         });
                    });

                sinon.stub(encrypt, 'generateHashedPassword')
                     .callsFake(() => {
                         return 'pass';
                     });
        });

        it('expect checkPassword to return true', () => {
            const username = 'Pesho';
            const password = 'pass';

            data.checkPassword(username, password).then((result) => {
                expect(result).to.deep.equal(true);
            });
        });
    });

    describe('when there is no user', () => {
        beforeEach(() => {
                // Arrange
                data = new UserData(db, User, User);

                sinon.stub(data, 'findByUsername')
                     .callsFake(() => {
                         return Promise.resolve(null);
                    });
        });

        it('expect checkPassword to throw when no user', () => {
            const username = 'Pesho';
            const password = 'pass';

            try {
                data.checkPassword(username, password);
            } catch (err) {
                expect(err.message).to.include('Invalid user !');
            }
        });
    });

    describe('when password is wrong', () => {
        beforeEach(() => {
                // Arrange
                data = new UserData(db, User, User);

                sinon.stub(data, 'findByUsername')
                     .callsFake(() => {
                         return Promise.resolve({
                             username: 'Pesho',
                             password: 'pas',
                             salt: '123',
                         });
                    });
        });

        it('expect checkPassword to return true', () => {
            const username = 'Pesho';
            const password = 'pass';

            try {
                data.checkPassword(username, password);
            } catch (err) {
                expect(err.message).to.include('Invalid password');
            }
        });
    });
});

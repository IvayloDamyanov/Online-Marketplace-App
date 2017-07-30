const { expect } = require('chai');
const sinon = require('sinon');

const UserData = require('../../../data/users.data');
const User = require('../../../models/user.model');
const encrypted = require('../../../utils/encryption');
const encrypt = encrypted.encrypt;

describe('UserData.UpdatePassword', () => {
    const db = {
        collection: () => {},
    };
    let data = null;
    let users = [];

    const updateOne = (item, password) => {
        const itm = users.find((x) => x._username === item._username);
        itm[password] = password;

        return Promise.resolve(itm);
    };

    describe('when there are items in db', () => {
        beforeEach(() => {
                // Arrange
                data = new UserData(db, User, User);
                users = [
                    {
                        username: 'Pesho',
                        password: 'pass',
                        salt: '123',
                    },

                     {
                        username: 'Gosho',
                        password: 'pass',
                        salt: '123',
                    },
                ];

                sinon.stub(data, 'findByUsername')
                     .callsFake(() => {
                         return Promise.resolve({
                             username: 'Pesho',
                             password: 'pass',
                             salt: '123',
                         });
                    });
        });

        it('expect updatePassword to update the user password', () => {
            const username = 'Pesho';
            const password = '000';

            const target = {
                username: username,
                password: password,
            };

            data.updatePassword(target).then((itm) => {
                expect(itm).to.deep.equal(target);
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

        it('expect UpdatePassword to throw when no user', () => {
            const username = 'Pesho';
            const password = 'pass';

            const target = {
                username: username,
                password: password,
            };

            try {
                data.updatePassword(target);
            } catch (err) {
                expect(err.message).to.include('Invalid user !');
            }
        });
    });
});

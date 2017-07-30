const { expect } = require('chai');
const sinon = require('sinon');

const UserData = require('../../../data/users.data');
const User = require('../../../models/user.model');

describe('UserData.filterBuilder', () => {
    const db = {
        collection: () => {},
    };
    let items = [];
    let data = null;

    describe('when there are items in db', () => {
        beforeEach(() => {
                items = [1, 2, 3];

                // Arrange
                data = new UserData(db, User, User);
        });

        it('expect to build the filter successfully', () => {
            const props = {
                username: 'Pesho',
                nickname: 'Pepcho',
                isDeleted: false,
            };

            const result = data.filterBuilder(props);
            expect(props).to.deep.equal(result);
        });
    });
});

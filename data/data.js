/* eslint linebreak-style: ["error", "windows"]*/

const UsersData = require('./users.data');
const AdvertsData = require('./advert.data');

const init = (db) => {
    return Promise.resolve({
        users: new UsersData(db),
        adverts: new AdvertsData(db),
    });
};

module.exports = { init };

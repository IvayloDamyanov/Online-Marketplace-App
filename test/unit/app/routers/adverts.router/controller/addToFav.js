const { expect } = require('chai');

const { init } =
require('../../../../../../app/routers/adverts.router/controller');

describe('adverts controller', () => {
    let data = null;
    let controller = null;
    const adverts = [
        {
            num: 1,
            name: 'Ad',
            country: 'bg',
            town: 'Sofia',
        },
        {
            num: 2,
            name: 'Ad2',
            country: 'bg2',
            town: 'Sofia2',
        },
    ];

    const advert = {
            num: 1,
            name: 'Ad',
            country: 'bg',
            town: 'Sofia',
    };

    const users = [
        { _id: 1, name: 'Pesho', adverts: [] },
        { _id: 2, name: 'Pencho', adverts: [] },
    ];

    const user = { _id: 2, name: 'Pencho', adverts: [] };

    let req = null;
    let res = null;

    beforeEach(() => {
        data = {
            adverts: {
                findByNum(num) {
                    const newAd = adverts.find((x) => x.num === num);
                    return Promise.resolve(newAd);
                },
                addToFav(curUser, curAdvert) {
                   curUser.adverts.push(curAdvert);
                },
            },
            users: {
                findById(id) {
                    return Promise.resolve(user);
                },
            },
        };

        controller = init(data);
        req = require('../../../../req-res').getRequestMock();
        res = require('../../../../req-res').getResponseMock();

        req = {
            body: {
                num: 1,
            },
            user: {
                _id: 1,
            },
        };
    });

    it('expect add to favourites to work correctly', () => {
        controller.addToFav(req, res);
    });
});

const { expect } = require('chai');

const { init } =
    require('../../../../../../app/routers/adverts.router/controller');

describe('adverts controller', () => {
    let data = null;
    let controller = null;

    let req = null;
    let res = null;

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

    beforeEach(() => {
        data = {
            adverts: {
                filterDataBy(model) {
                    return Promise.resolve(advert);
                },
            },
        };

        controller = init(data);
        req = require('../../../../req-res').getRequestMock();
        res = require('../../../../req-res').getResponseMock();

        req = {
            query: {
                1: 2,
            },
        };
    });

    it('expect get search to work properly', () => {
        controller.getAds(req, res).then(() => {
           expect(res.model).to.be.deep.equal({
                model: advert,
           });
           expect(res.viewName).to.be.equal('adverts/ads');
        });
    });
});

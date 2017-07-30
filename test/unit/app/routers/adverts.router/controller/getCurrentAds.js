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

    beforeEach(() => {
        data = {
            adverts: {
                getAllAds(model) {
                    return Promise.resolve(adverts);
                },
            },
        };

        controller = init(data);
        req = require('../../../../req-res').getRequestMock();
        res = require('../../../../req-res').getResponseMock();
    });

    it('expect get current ads to return the current ads', () => {
        controller.getCurrentAds(req, res).then(() => {
           expect(res.model).to.be.deep.equal({
                model: adverts,
           });
           expect(res.viewName).to.be.equal('adverts/ads');
        });
    });
});

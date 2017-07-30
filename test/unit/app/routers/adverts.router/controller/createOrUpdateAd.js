const { expect } = require('chai');
const sinon = require('sinon');

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
                findFirst(num) {
                    const newAd = adverts.find((x) => x.num === num);
                    return Promise.resolve(newAd);
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
        };

        sinon.stub(controller, 'isOwner')
                     .callsFake(() => {
                         return false;
                     });
    });

    it('expect createOrUpdate to not update ad', () => {
        controller.createOrUpdateAd(req, res);
    });
});

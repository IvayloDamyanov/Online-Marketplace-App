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
                findByNum(num) {
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
        controller.createOrUpdateAd(req, res).then(() => {
            expect(res.viewName).to.equal('adverts/status');
            expect(res.context).to.deep.equal({
                model: {
                    num: 1,
                    msg: 'not updated. You are not the owner of this ad',
                },
            });
        });
    });
});

describe('adverts controller with owner equal to true', () => {
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
                findByNum(num) {
                    const newAd = adverts.find((x) => x.num === num);
                    return Promise.resolve(newAd);
                },
                updateById(item, model) {
                    return true;
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
                         return true;
                     });
    });

    it('expect createOrUpdate to  update ad', () => {
        controller.createOrUpdateAd(req, res).then(() => {
            expect(res.viewName).to.equal('adverts/status');
            expect(res.context).to.deep.equal({
                model: {
                    num: 1,
                    msg: 'updated',
                },
            });
        });
    });
});

describe('adverts controller to create', () => {
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
                findByNum(num) {
                    const newAd = adverts.find((x) => x.num === num);
                    return Promise.resolve(newAd);
                },
                updateById(item, model) {
                    return true;
                },
                create(model) {
                    adverts.push(model);
                },
            },
        };

        controller = init(data);
        req = require('../../../../req-res').getRequestMock();
        res = require('../../../../req-res').getResponseMock();

        req = {
            body: {
                num: 4,
            },
        };

        sinon.stub(controller, 'isOwner')
                     .callsFake(() => {
                         return true;
                     });
    });

    it('expect createOrUpdate to  create ad', () => {
        controller.createOrUpdateAd(req, res).then(() => {
            expect(res.viewName).to.equal('adverts/status');
            expect(res.context).to.deep.equal({
                model: {
                    num: 4,
                    msg: 'created',
                },
            });
        });
    });
});

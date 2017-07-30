const { expect } = require('chai');

const { init } =
    require('../../../../../../app/routers/adverts.router/controller');

describe('adverts controller', () => {
    const data = null;
    let controller = null;

    let req = null;
    let res = null;

    beforeEach(() => {
        controller = init(data);
        req = require('../../../../req-res').getRequestMock();
        res = require('../../../../req-res').getResponseMock();
    });

    it('expect get create to work properly', () => {
        controller.getCreate(req, res);
        expect(res.viewName).to.be.equal('adverts/create');
    });
});

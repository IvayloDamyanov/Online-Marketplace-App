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

        req = {
            user: {
                favourites: 1,
            },
        };
    });

    it('expect get fav to return favourites', () => {
        controller.getFav(req, res);
        expect(res.viewName).to.be.equal('adverts/favs');
    });
});

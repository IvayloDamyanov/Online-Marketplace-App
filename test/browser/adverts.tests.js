/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');

describe('item routes', () => {
    let driver = null;
    const url = 'http://localhost:3001/';

    beforeEach(() => {
        driver = setupDriver('chrome');
    });

    it('check app title', () => {
        return driver.get(url)
            .then(() => {
                console.log('asadasddsad');
                // return driver.getTitle();
            })
            .then(() => {
                console.log('Title: ');
                // expect(title).not.to.be.undefined;
            });
    });
});

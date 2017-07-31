/* eslint-disable no-unused-expressions */
const webdriver = require('selenium-webdriver');
const ui = require('./utils/ui');
const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');

describe('item routes', () => {
    let driver = null;
    const url = 'http://localhost:3001/';

    beforeEach((done) => {
        driver = setupDriver('chrome');
        done();
    });

    describe('Valid create item', () => {
        beforeEach((done) => {
            console.log('2');
            Promise.resolve()
                .then(() => driver.get(url))
                .then(() => driver.manage().window().maximize())
                .then(() => {
                    console.log('3');
                    return driver.findElement(
                        webdriver.By.css('#nav-btn-toggle-items')
                    );
                })
                .then((btn) => {
                    btn.click();
                })
                .then(() => {
                    console.log('4');
                    return driver.findElement(
                        webdriver.By.css('#nav-btn-item-all')
                    );
                })
                .then((btn) => {
                    btn.click();
                    done();
                });
        });

        it('expect to be visible in items', (done) => {
            console.log('5');
            Promise.resolve()
                .then(() => {
                    return ui.waitFor(driver, 'container');
                    // return driver.findElement(
                    //     webdriver.By.className('h4')
                    // );
                })
                .then((element) => console.log('Tit: ' + element))
                .then(() => {
                    console.log('6');
                    driver.quit();
                    done();
                });
        });
    });
});

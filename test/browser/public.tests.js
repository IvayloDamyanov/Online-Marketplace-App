/* eslint-disable no-unused-expressions */

const webdriver = require('selenium-webdriver');
const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');

describe('Test public routes', () => {
    let driver = null;
    const url = 'http://localhost:3001/';

    beforeEach((done) => {
        driver = setupDriver('chrome');
        done();
    });

    describe('User', () => {
        beforeEach((done) => {
            Promise.resolve()
                .then(() => driver.get(url))
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('#nav-btn-toggle-user')
                    );
                })
                .then((btn) => {
                    btn.click();
                    done();
                });
        });

        it('Sign-up', (done) => {
            Promise.resolve()
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('#nav-btn-sign-up')
                    );
                })
                .then((btn) => {
                    btn.click();
                })
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('.form-control')
                    );
                })
                .then((element) => {
                    expect(element).not.to.be.undefined;
                    driver.quit();
                    done();
                });
        });

        it('Sign-in', (done) => {
            Promise.resolve()
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('#nav-btn-sign-in')
                    );
                })
                .then((btn) => {
                    btn.click();
                })
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('.form-control')
                    );
                })
                .then((element) => {
                    expect(element).not.to.be.undefined;
                    driver.quit();
                    done();
                });
        });
    });

    describe('Adverts', () => {
        beforeEach((done) => {
            Promise.resolve()
                .then(() => driver.get(url))
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('#nav-btn-toggle-adverts')
                    );
                })
                .then((btn) => {
                    btn.click();
                    done();
                });
        });

        it('Ads', (done) => {
            Promise.resolve()
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('#nav-btn-all-ads')
                    );
                })
                .then((btn) => {
                    btn.click();
                })
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('#ads-heading')
                    );
                })
                .then((element) => {
                    expect(element).not.to.be.undefined;
                    driver.quit();
                    done();
                });
        });
    });

    describe('Search', () => {
        beforeEach((done) => {
            Promise.resolve()
                .then(() => driver.get(url))
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('#nav-btn-toggle-search')
                    );
                })
                .then((btn) => {
                    btn.click();
                    done();
                });
        });

        it('Ads', (done) => {
            Promise.resolve()
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('#nav-btn-search-ads')
                    );
                })
                .then((btn) => {
                    btn.click();
                })
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('#form-search-ads')
                    );
                })
                .then((element) => {
                    expect(element).not.to.be.undefined;
                    driver.quit();
                    done();
                });
        });
    });
});

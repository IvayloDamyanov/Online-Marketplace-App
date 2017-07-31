const webdriver = require('selenium-webdriver');
// const ui = require('./utils/ui');
const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');

const url = 'http://localhost:3001/';

let driver =
        new webdriver.Builder()
            .usingServer()
            .withCapabilities({
                browserName: 'chrome',
            })
            .build();

Promise.resolve()
                .then(() => driver.get(url))
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
                })
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('#ads-heading')
                    );
                })
                .then((element) => console.log('Tit: ' + element))
                .then(() => {
                    console.log('6');
                    driver.quit();
                });

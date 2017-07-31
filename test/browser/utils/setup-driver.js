const webdriver = require('selenium-webdriver');

const setupDriver = (browser) => {
    const driver =
        new webdriver.Builder()
            .usingServer('http://127.0.0.1:4444/wd/hub')
            .withCapabilities({
                browserName: browser,
            })
            .build();

    return driver;
};

module.exports = { setupDriver };

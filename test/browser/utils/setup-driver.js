const webdriver = require('selenium-webdriver');

const setupDriver = (browser) => {
    const driver =
        new webdriver.Builder()
            .usingServer()
            .withCapabilities({
                browserName: browser,
            })
            .build();

    return driver;
};

module.exports = { setupDriver };

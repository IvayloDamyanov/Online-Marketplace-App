const webdriver = require('selenium-webdriver');

const browser = new webdriver.Builder()
      .withCapabilities({ 'browserName': 'chrome' })
      .usingServer()
      .build();
browser.get('http://localhost:3001');
    browser.findElements(webdriver.By.className('container'))
      .then(function(links) {
      console.log('Found', links);
      browser.quit();
    });

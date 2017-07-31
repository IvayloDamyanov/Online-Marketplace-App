/* eslint-disable no-unused-expressions */

const webdriver = require('selenium-webdriver');
const { expect } = require('chai');
const { setupDriver } = require('./utils/setup-driver');
const user = 'ivoivo';
const password = 'passpass';
const nickname = 'ivopivo';
const age = '30';
const interests = 'haxmax';


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
                        webdriver.By.css('#form-user')
                    );
                })
                .then((element) => {
                    element.sendKeys(user);
                })
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('#form-password')
                    );
                })
                .then((element) => {
                    element.sendKeys(password);
                })
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('#form-nickname')
                    );
                })
                .then((element) => {
                    element.sendKeys(nickname);
                })
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('#form-age')
                    );
                })
                .then((element) => {
                    element.sendKeys(age);
                })
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('#gender-male')
                    );
                })
                .then((element) => {
                    element.click();
                })
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('#form-interests')
                    );
                })
                .then((element) => {
                    element.sendKeys(interests);
                })
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('#btn-sign-up')
                    );
                })
                .then((btn) => {
                    btn.click();
                })
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('#form-user')
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
                        webdriver.By.css('#form-user')
                    );
                })
                .then((element) => {
                    element.sendKeys(user);
                })
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('#form-password')
                    );
                })
                .then((element) => {
                    element.sendKeys(password);
                })
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('#btn-sign-in')
                    );
                })
                .then((btn) => {
                    btn.click();
                })
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('#home-heading')
                    );
                })
                .then((element) => {
                    expect(element).not.to.be.undefined;
                    driver.quit();
                    done();
                });
        });
    });

    describe('Private', () => {
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
                })
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
                        webdriver.By.css('#form-user')
                    );
                })
                .then((element) => {
                    element.sendKeys(user);
                })
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('#form-password')
                    );
                })
                .then((element) => {
                    element.sendKeys(password);
                })
                .then(() => {
                    return driver.findElement(
                        webdriver.By.css('#btn-sign-in')
                    );
                })
                .then((btn) => {
                    btn.click();
                    done();
                });
        });

        describe('Settings', () => {
            beforeEach((done) => {
                Promise.resolve()
                    .then(() => driver.get(url))
                    .then(() => {
                        return driver.findElement(
                            webdriver.By.css('#nav-btn-toggle-settings')
                        );
                    })
                    .then((btn) => {
                        btn.click();
                        done();
                    });
            });

            it('Users', (done) => {
                Promise.resolve()
                    .then(() => {
                        return driver.findElement(
                            webdriver.By.css('#nav-btn-users')
                        );
                    })
                    .then((btn) => {
                        btn.click();
                    })
                    .then(() => {
                        return driver.findElement(
                            webdriver.By.css('#all-users-heading')
                        );
                    })
                    .then((element) => {
                        expect(element).not.to.be.undefined;
                        driver.quit();
                        done();
                    });
            });

            it('Update profile', (done) => {
                Promise.resolve()
                    .then(() => {
                        return driver.findElement(
                            webdriver.By.css('#nav-btn-update-profile')
                        );
                    })
                    .then((btn) => {
                        btn.click();
                    })
                    .then(() => {
                        return driver.findElement(
                            webdriver.By.css('#update-profile-heading')
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

            it('Create ads', (done) => {
                Promise.resolve()
                    .then(() => {
                        return driver.findElement(
                            webdriver.By.css('#nav-btn-create-ad')
                        );
                    })
                    .then((btn) => {
                        btn.click();
                    })
                    .then(() => {
                        return driver.findElement(
                            webdriver.By.css('#create-heading')
                        );
                    })
                    .then((element) => {
                        expect(element).not.to.be.undefined;
                        driver.quit();
                        done();
                    });
            });

            it('Favourite ads', (done) => {
                Promise.resolve()
                    .then(() => {
                        return driver.findElement(
                            webdriver.By.css('#nav-btn-favourite-ads')
                        );
                    })
                    .then((btn) => {
                        btn.click();
                    })
                    .then(() => {
                        return driver.findElement(
                            webdriver.By.css('#favs-heading')
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

            it('Search ads', (done) => {
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

            it('Search users', (done) => {
                Promise.resolve()
                    .then(() => {
                        return driver.findElement(
                            webdriver.By.css('#nav-btn-search-users')
                        );
                    })
                    .then((btn) => {
                        btn.click();
                    })
                    .then(() => {
                        return driver.findElement(
                            webdriver.By.css('#search-users-heading')
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
});

const request = require('supertest');

describe('/auth tests', () => {
    const connectionString = 'mongodb://localhost/advertisment-db';
    let app = null;

    beforeEach(() => {
        return Promise.resolve()
            .then(() => require('../../db').init(connectionString))
            .then((db) => require('../../data').init(db))
            .then((data) => require('../../app').init(data))
            .then((_app) => {
                app = _app;
            });
    });

    describe('GET /sign-up', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/auth/sign-up')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /sign-in', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/auth/sign-in')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /sign-out', () => {
        it('expect to return 302', (done) => {
            request(app)
                .get('/auth/sign-out')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
});

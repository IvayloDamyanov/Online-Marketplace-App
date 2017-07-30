const request = require('supertest');

describe('/adverts tests', () => {
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

    describe('GET /ads', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/adverts/ads')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /create', () => {
        it('expect to return 302', (done) => {
            request(app)
                .get('/adverts/create')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /search', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/adverts/search')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('POST /ads', () => {
        it('expect to return 302', (done) => {
            request(app)
                .post('/adverts/ads')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('DELETE /ads', () => {
        it('expect to return 200', (done) => {
            request(app)
                .delete('/adverts/ads')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });
});

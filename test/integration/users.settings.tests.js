const request = require('supertest');

describe('/settings tests', () => {
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

    describe('GET /users', () => {
        it('expect to return 302', (done) => {
            request(app)
                .get('/settings/users')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /updateProfile', () => {
        it('expect to return 200', (done) => {
            request(app)
                .get('/settings/updateProfile')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('GET /messages', () => {
        it('expect to return 302', (done) => {
            request(app)
                .get('/settings/messages')
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
                .get('/settings/search')
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('POST /users/:id', () => {
        it('expect to return 302', (done) => {
            request(app)
                .post('/settings/users/:id')
                .expect(302)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    return done();
                });
        });
    });

    describe('DELETE /users/:id', () => {
        it('expect to return 302', (done) => {
            request(app)
                .delete('/settings/users/:id')
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

const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');
const { MongoClient } = require('mongodb');
const config = {
    connectionString: 'mongodb://localhost/advertisment-test-db',
    port: 3001,
};

gulp.task('server:start', () => {
    return require('./server');
});

gulp.task('db:start', () => {
    return MongoClient.connect(config.connectionString)
        .then((db) => {
            return db.dropDatabase();
        });
});

gulp.task('start:server', () => {
    return Promise.resolve()
        .then(() => require('./db').init(config.connectionString))
        .then((db) => require('./data').init(db))
        .then((data) => require('./app').init(data))
        .then((app) => {
            app.listen(
                config.port,
                () => console.log(`Magic happens at :${config.port}`));
        });
});

gulp.task('pre-test', () => {
    return gulp.src([
        './data/**/*.js',
        './app/**/*.js',
        './config/**/*.js',
        './db/**/*.js',
        './models/**/*.js',
        './server.js',
    ])
        .pipe(istanbul({
            includeUntested: true,
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('tests:unit', ['pre-test'], () => {
    return gulp.src([
        './test/unit/**/*.js',
        './test/integration/**/*.js',
    ])
        .pipe(mocha({
            reporter: 'nyan',
        }))
        .pipe(istanbul.writeReports());
});

gulp.task('tests:browser', ['db:start', 'server:start'], () => {
    return gulp.src(['./test/browser/public.tests.js',
                    './test/browser/private.tests.js'])
        .pipe(mocha({
            reporter: 'nyan', timeout: 15000,
        }))
        .pipe(istanbul.writeReports());
});


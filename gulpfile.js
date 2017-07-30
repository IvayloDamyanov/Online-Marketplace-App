const gulp = require('gulp');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');

gulp.task('server:start', () => {
    return require('./server');
});

const config = {
    connectionString: 'mongodb://localhost/advertisment-db',
    port: 3001,
};

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

const { MongoClient } = require('mongodb');

gulp.task('stop:server', () => {
    return MongoClient.connect(config.connectionString)
        .then((db) => {
            return db.dropDatabase();
        });
});

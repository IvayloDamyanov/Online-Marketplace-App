const gulp = require('gulp');

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

const { MongoClient } = require('mongodb');

gulp.task('stop:server', () => {
    return MongoClient.connect(config.connectionString)
        .then((db) => {
            return db.dropDatabase();
        });
});

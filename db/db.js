const MongoClient = require('mongodb');

const init = (connectionString) => {
    return MongoClient.connect(connectionString)
        .then((db) => {
            console.log('Database connected !!!');
            return db;
        });
};

module.exports = { init };

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const passportSocket = require('passport.socketio');
const config = require('../../config/config');

const configSockets = (app, { users }) => {
    // eslint-disable-next-line
    const server = require('http').Server(app);
    const io = require('socket.io')(server);

    const onAuthorizationSuccess = (data, accept) => {
        accept(null, true);
    };

     const onAuthorizationFail = (data, message, error, accept) => {
        if (error) {
            throw new Error(message);
        }

        accept(null, false);
    };

    io.use(passportSocket.authorize({
        cookieParser,
        store: new MongoStore({ url: config.connectionString }),
        secret: config.sessionSecret,
        success: onAuthorizationSuccess,
        error: onAuthorizationFail,
    }));
};

module.exports = configSockets;

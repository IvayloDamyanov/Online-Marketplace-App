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

    io.on('connection', (socket) => {
        socket.on('add-friend', (friendId) => {
            users.findById(friendId)
                 .then((friend) => {
                     users.addFriendship(
                         socket.request.user,
                         friend
                     );

                     return friend;
                 })
                 .then((targetUser) => {
                     passportSocket.filterSocketsByUser(io, (user) => {
                         return user._id.toString() ===
                            targetUser._id.toString();
                     })
                     .forEach((sock) => {
                         sock.emit('add-friend', socket.request.user);
                     });
                 });
        });
        socket.on('remove-notification', (notification) => {
            const notifications = socket.request.user.notifications;
            const index = notifications.findIndex((x) => x === notification);
            notifications.splice(index, 1);

            users.findById(socket.request.user._id.toString())
                 .then((user) => {
                     user.notifications = notifications;
                     users.updateById(user, user);
                 });
        });
        socket.on('show-messages', (friendId) => {
            users.findById(socket.request.user._id.toString())
                 .then((user) => {
                     return user.friends
                                .find((x) => x._id.toString() === friendId);
                 })
                 .then((friend) => {
                     const messages = friend.messages;
                     socket.emit('show-messages', messages);
                 });
        });
    });
};

module.exports = configSockets;

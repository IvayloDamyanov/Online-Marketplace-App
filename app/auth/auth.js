const passport = require('passport');
const { Strategy } = require('passport-local');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const config = require('../../config');

const applyTo = (app, data) => {
    passport.use(new Strategy((username, password, done) => {
        data.users.checkPassword(username, password)
           .then(() => {
               return data.users.findByUsername(username);
           })
           .then((user) => {
               if (user.isDeleted) {
                  done(null, false,
                    { message: 'Deleted user ' + user.username });
               }
               done(null, user);
           })
           .catch((err) => {
               done(err);
           });
    }));

     app.use(session({
        store: new MongoStore({ url: config.connectionString }),
        secret: config.sessionSecret,
        resave: true,
        saveUninitialized: true,
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        data.users.findById(id)
            .then((user) => {
                done(null, user);
            }).catch(done);
    });

    app.use((req, res, next) => {
        res.locals = {
            user: req.user,
        };

        next();
    });
};

const isAuthenticated = (req, res, next) => {
        if (!req.isAuthenticated()) {
            res.redirect('/auth/sign-in');
        } else {
            next();
        }
    };

module.exports = { applyTo, isAuthenticated };

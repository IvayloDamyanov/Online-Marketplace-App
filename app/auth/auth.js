const passport = require('passport');
const { Strategy } = require('passport-local');

const applyTo = (app, data) => {
    passport.use(new Strategy((username, password, done) => {
        data.users.checkPassword(username, password)
           .then(() => {
               return data.users.findByUsername(username);
           })
           .then((user) => {
               done(null, user);
           })
           .catch((err) => {
               done(err);
           });
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

const encrypted = require('../../../utils/encryption');
const encrypt = encrypted.encrypt;

class UsersController {
    constructor(data) {
        this.data = data;
    }

    getSignUpForm(req, res) {
        return res.render('auth/sign-up');
    }

    getSignInForm(req, res) {
        return res.render('auth/sign-in');
    }

    signOut(req, res) {
        req.logout();
        req.toastr.success('Successfully logged out!');
        return res.redirect('/');
    }

    signUp(req, res) {
        const bodyUser = req.body;

        this.data.users.findByUsername(bodyUser.username)
            .then((dbUser) => {
                if (dbUser) {
                    req.toastr.error('User already exists !');
                    return res.redirect('/');
                }

                bodyUser.isDeleted = bodyUser.isDeleted || false;
                bodyUser.favourites = bodyUser.favourites || [];
                bodyUser.messages = bodyUser.messages || [];
                bodyUser.friends = bodyUser.friends || [];
                bodyUser.notifications = bodyUser.notifications || [];
                bodyUser.salt = encrypt.generateSalt();
                bodyUser.password = encrypt.
                generateHashedPassword(bodyUser.salt, bodyUser.password);
                return this.data.users.create(bodyUser);
            })
            .then((dbUser) => {
                req.toastr.success('Successfully registered');
                return res.redirect('/auth/sign-in');
            })
            .catch((err) => {
                req.toastr.error('Failed to register!');
                req.flash('error', err);
                return res.redirect('/');
            });
    }
}

const init = (data) => {
    return new UsersController(data);
};

module.exports = { init };

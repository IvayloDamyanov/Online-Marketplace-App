class UserSettingsController {
    constructor(data) {
        this.data = data;
    }

    updateUser(req, res) {
        const bodyUser = req.body;

        this.data.users.updatePassword(bodyUser)
        .then((user) => {
            return res.redirect('/');
        })
        .catch((err) => {
            req.flash('error', err);
            return res.send(err);
        });
    }

    getHome(req, res) {
        return res.render('settings/home');
    }

    getUsers(req, res) {
        return res.render('settings/users');
    }
}

const init = (data) => {
    return new UserSettingsController(data);
};

module.exports = { init };

class UserSettingsController {
    constructor(data) {
        this.data = data;
    }

    updateUser(req, res) {
        const bodyUser = req.body;

        Promise.all([this.data.users.updatePassword(bodyUser),
        this.data.users.updateProfile(bodyUser)])
        .then(() => {
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
        this.data.users.getAllUsers()
          .then((user) => {
              return res.render('settings/users', { model: user });
          });
    }

    getUpdateProfile(req, res) {
        return res.render('settings/updateProfile');
    }
}

const init = (data) => {
    return new UserSettingsController(data);
};

module.exports = { init };

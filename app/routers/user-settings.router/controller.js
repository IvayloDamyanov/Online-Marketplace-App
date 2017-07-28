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

    getUsers(req, res) {
        this.data.users.getAllUsers()
          .then((user) => {
              return res.render('settings/users', { model: user });
          });
    }

    getUpdateProfile(req, res) {
        return res.render('settings/updateProfile');
    }

    deleteCurrentUser(req, res) {
        const id = req.params.id;

        this.data.users.deleteUser(id)
            .then(() => {
               res.status(200).json({
                    redirect: '/auth/sign-up',
               });
            })
            .catch((err) => {
                req.flash('error', err);
                return res.send(err);
            });
    }
}

const init = (data) => {
    return new UserSettingsController(data);
};

module.exports = { init };

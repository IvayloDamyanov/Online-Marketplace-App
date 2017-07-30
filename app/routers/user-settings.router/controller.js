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

    getSearch(req, res) {
        return res.render('settings/search');
    }

    getUsers(req, res) {
        this.data.users.getAllUsers()
          .then((user) => {
              return res.render('settings/users', { model: user });
          });
    }

    getUser(req, res) {
        const model = req.query;
        const items = this.data.users.filterDataBy(model);

        items.then((item) => {
            res.render('settings/users', { model: item });
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

    getMessageView(req, res) {
        const context = {
            user: req.user,
            friend: '',
        };

        if (req.query.user) {
            context.friend = req.query.user;
        }

        res.status(200).render('settings/messages', { context });
    }
}

const init = (data) => {
    return new UserSettingsController(data);
};

module.exports = { init };

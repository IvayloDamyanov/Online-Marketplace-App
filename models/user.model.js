class User {
    static isValid(model) {
        if (typeof model !== 'undefined' &&
           typeof model.username === 'string' &&
           typeof model.password === 'string' &&
           model.username.length > 3 &&
           model.password.length > 5) {
               return true;
        }
        return false;
    }

    get id() {
        return this._id;
    }

    static toViewModel(model) {
        const viewModel = new User();

        Object.keys(model)
              .forEach((prop) => {
                  viewModel[prop] = model[prop];
              });

        return viewModel;
    }
}

module.exports = User;

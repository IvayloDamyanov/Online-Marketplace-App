class Advert {
    static isValid(model) {
        return typeof model !== 'undefined'
        && typeof model.name === 'string'
        && model.name.length > 4;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    static toViewModel(model) {
        const viewModel = new Advert();

        Object.keys(model)
              .forEach((prop) => {
                  viewModel[prop] = model[prop];
              });

        return viewModel;
    }
}

module.exports = Advert;

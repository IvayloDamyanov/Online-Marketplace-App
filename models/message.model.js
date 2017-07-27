class Message {
    constructor(firstUser, secondUser, identification, texts) {
        this.firstUser = firstUser;
        this.secondUser = secondUser;
        this.texts = texts;
        this.identification = identification;
    }

    static isValid(model) {
        return typeof model !== 'undefined'
        && typeof model.identification === 'string';
    }

    static toViewModel(model) {
        const viewModel = new Message();

        Object.keys(model)
              .forEach((prop) => {
                  viewModel[prop] = model[prop];
              });

        return viewModel;
    }
}

module.exports = Message;

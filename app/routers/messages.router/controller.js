class MessageController {
    constructor(data) {
        this.data = data;
    }

    parseMessages(messages, id) {
    const result = [];
    messages.forEach((message) => {
        let user;
        const usernames = [message.firstUser.username,
            message.secondUser.username].sort();
        const identification = usernames[0] + usernames[1];
        if (message.firstUser._id !== id) {
            user = message.firstUser;
        } else {
            user = message.secondUser;
        }
        result.push({ user, identification });
    });
    return result;
  }

    getMessageForm(req, res) {
        const userId = JSON.stringify(req.user._id);
        return this.data
        .loadCurrentConversations(userId.substring(1, userId.length - 1))
        .then((messages) => {
            return res.status(200).render('messages/messages', {
                result: this.parseMessages(messages, req.user._id),
            });
        });
    }

    initializeMessage(req, res) {
       const id = JSON.stringify(req.user._id);
       const firstUser = {
            username: req.user.username,
            _id: id.substring(1, id.length - 1),
        };

        const secondUser = {
            username: req.body.username,
            id: req.body._id,
        };

        const usernames = [firstUser.username, secondUser.username].sort();
        const identification = usernames[0] + usernames[1];

        return this.data.findByIdentification(identification)
                .then((message) => {
                    if (message) {
                        return res.status(201).json({
                            success: true,
                            redirect: '/messages',
                        });
                    }
                 return this.data
                .createConversation({ firstUser, secondUser, identification })
                .then(() => {
                            return res.status(201).json({
                                success: true,
                                redirect: '/messages',
                                });
                            });
                });
    }

    getTexts(req, res) {
            const usernames = [req.user.username, req.body.username].sort();
            const identification = usernames[0] + usernames[1];
            const loggedUsername = req.user.username;

            return this.data.findByIdentification(identification)
                .then((message) => {
                    return res.status(200).json({
                        texts: message.texts,
                        loggedUser: loggedUsername,
                    });
                });
    }

    addMessage(req, res) {
            const identification = req.body.identification;
            const text = req.body.text;
            const owner = req.user.username;
            const date = JSON.stringify(Date());

            return this.data.addMessage(identification, text, owner, date)
                .then(() => {
                    return res.status(200).json({
                        texts: [{
                            date: date,
                            owner: owner,
                            text: text,
                        }],
                        loggedUser: owner,
                    });
                });
        }
}

const init = (data) => {
    return new MessageController(data);
};

module.exports = { init };

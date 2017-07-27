const Message = require('../models/message.model');
const BaseData = require('./base/base.data');

class MessageData extends BaseData {
    constructor(db) {
        super(db, Message, Message);
    }

    loadCurrentConversations(userId) {
            return new Promise((resolve, reject) => {
               this.collection.find({ $or: [{ 'firstUser._id': userId },
               { 'secondUser._id': userId }] }, (err, messages) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(messages);
                });
            });
     }

     createConversation(args) {
            const message = new Message(
                args.firstUser,
                args.secondUser,
                args.identification,
                [{}]
            );

            return new Promise((resolve, reject) => {
                this.collection.save(message)
                   .then((err) => {
                       if (err) {
                           reject(err);
                       }
                       resolve(message);
                   });
            });
    }

    findByIdentification(identification) {
            return new Promise((resolve, reject) => {
                this.collection.findOne({ 'identification': identification },
                (err, message) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(message);
                });
            });
    }

    addMessage(identification, text, owner, date) {
            return new Promise((resolve, reject) => {
                this.findByIdentification(identification)
                    .then((message) => {
                        message.texts.push({
                            text,
                            owner,
                            date,
                        });

                        resolve(this.collection.save(message));
                    });
            });
    }
}

module.exports = Message;

const User = require('../models/user.model');
const BaseData = require('./base/base.data');
const encrypted = require('../../../utils/encryption');
const encrypt = encrypted.encrypt;

class UserData extends BaseData {
    constructor(db) {
        super(db, User, User);
    }

    findByUsername(username) {
        return this
            .filterBy({ username: new RegExp(username, 'i') })
            .then(([user]) => user);
    }

    checkPassword(username, password) {
        return this.findByUsername(username)
           .then((user) => {
               if (!user) {
                   throw new Error('Invalid user !');
               }

               const salt = encrypt.generateSalt();
               const hashPass = encrypt.
                generateHashedPassword(salt, password);

               if (user.password !== hashPass) {
                   throw new Error('Invalid password !');
               }

               return true;
           });
    }
}

module.exports = UserData;

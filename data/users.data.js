/* eslint linebreak-style: ["error", "windows"]*/

const User = require('../models/user.model');
const BaseData = require('./base/base.data');

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

               if (user.password !== password) {
                   throw new Error('Invalid password !');
               }

               return true;
           });
    }
}

module.exports = UserData;

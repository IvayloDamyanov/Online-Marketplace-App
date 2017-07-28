const User = require('../models/user.model');
const BaseData = require('./base/base.data');
const encrypted = require('../utils/encryption');
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

               const hashPass = encrypt.
                generateHashedPassword(user.salt, password);

               if (user.password !== hashPass) {
                   throw new Error('Invalid password !');
               }

               return true;
           });
    }

    updatePassword(target) {
        return this.findByUsername(target.username)
              .then((user) => {
                  if (!user) {
                      throw new Error('Invalid user !');
                  }

                  const hashPass = encrypt.
                  generateHashedPassword(user.salt, target.password);

                   return this.collection.updateOne({
                          username: user.username,
                    }, { $set: { 'password': hashPass } },
                    { upsert: true });
              });
    }

    updateProfile(target) {
        this.findByUsername(target.username)
            .then((user) => {
                return this.collection.update(
                    { username: user.username },
                    { username: user.username,
                      password: user.password,
                      salt: user.salt,
                      nickname: target.nickname,
                      age: target.age,
                      gender: target.gender,
                      interests: target.interests },
                      { upsert: true });
            });
    }

    updateIsDeletedProperty(user) {
        return this.collection.update(
            { username: user.username },
            { username: user.username,
              password: user.password,
              salt: user.salt,
              nickname: user.nickname,
              age: user.age,
              gender: user.gender,
              interests: user.interests,
              isDeleted: true },
            { upsert: true });
    }

    deleteUser(id) {
      return this.findById(id)
                 .then((user) => {
                     return this.updateIsDeletedProperty(user);
                 });
    }

    getAllUsers() {
        return this.getAll();
    }
}

module.exports = UserData;

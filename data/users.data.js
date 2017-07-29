const User = require('../models/user.model');
const BaseData = require('./base/base.data');
const encrypted = require('../utils/encryption');
const encrypt = encrypted.encrypt;

class UserData extends BaseData {
    constructor(db) {
        super(db, User, User);
        this.favourites = [];
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
                return this.collection.updateOne(
                    { username: user.username },
                    { $set: {
                      nickname: target.nickname,
                      age: target.age,
                      gender: target.gender,
                      interests: target.interests } },
                      { upsert: true });
            });
    }

    updateIsDeletedProperty(user) {
        return this.collection.updateOne(
            { username: user.username },
            { $set: { isDeleted: true } },
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

    addFriendship(user, friend) {
        const friendModel = (userInfo) => {
            return {
              _id: userInfo._id,
              username: userInfo.username,
              password: userInfo.password,
              salt: userInfo.salt,
              nickname: userInfo.nickname,
              age: userInfo.age,
              gender: userInfo.gender,
              interests: userInfo.interests,
              isDeleted: userInfo.isDeleted,
              messages: [],
            };
        };

        user.friends.push(friendModel(friend));
        this.updateById(user, user);

        friend.notifications.push(`${user.username} added you as a friend!`);
        friend.friends.push(friendModel(user));
        this.updateById(friend, friend);
    }
}

module.exports = UserData;

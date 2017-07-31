const User = require('../models/user.model');
const BaseData = require('./base/base.data');
const encrypted = require('../utils/encryption');
const encrypt = encrypted.encrypt;

class UserData extends BaseData {
    constructor(db) {
        super(db, User, User);
        this.favourites = [];
    }

    filterBuilder(props) {
        const filter = {};
        filter.isDeleted = false;
        if (props.username && props.username.length > 0) {
            filter.username = props.username;
        }
        if (props.username && props.nickname.length > 0) {
            filter.nickname = props.nickname;
        }
        return filter;
    }

    filterDataBy(props) {
        const query = this.filterBuilder(props);
        return this.collection.find(query).toArray();
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
                   const message = `Invalid user! 
            Please go back to the homepage and try again.`;
                   return Promise
                   .reject(message);
               }

               const hashPass = encrypt.
                generateHashedPassword(user.salt, password);

               if (user.password !== hashPass) {
                   const message = `Invalid password! 
            Please go back to the homepage and try again.`;
                   return Promise.reject(message);
               }

               return true;
           });
    }

    updatePassword(target) {
        return this.findByUsername(target.username)
              .then((user) => {
                  if (!user) {
                      return Promise.reject('Invalid user!');
                  }

                  const oldPass = encrypt.
                  generateHashedPassword(user.salt, target.oldPassword);

                  if (user.password !== oldPass) {
                      console.log(oldPass);
                      console.log(target.oldPassword);
                      return Promise.reject('Invalid password!');
                  }

                  if (target.password !== target.ConfPassword) {
                      return Promise.reject('Invalid password provided!');
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
                if (!user) {
                      return Promise.reject('Invalid user!');
                }

                target.nickname = target.nickname || user.nickname;
                target.age = target.age || user.age;
                target.gender = target.gender || user.gender;
                target.interests = target.interests || user.interests;

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

    addChatMessage(user, friend, message) {
        const userRelation = user.friends
              .find((x) => x._id.toString() === friend._id.toString());

        const friendRelation = friend.friends
              .find((x) => x._id.toString() === user._id.toString());

        if (userRelation === 'undefined' || friendRelation === 'undefined') {
            return Promise.reject('The users must be friends to chat!');
        }

        const date = Date.now();
        const messageModel = {
            newMessage: false,
            senderId: user._id,
            username: user.username,
            time: date,
            message,
        };

        userRelation.messages.push(messageModel);
        this.updateById(user, user);

        const notification = `${user.username} texted you!`;

        if (!friend.notifications.some((x) => x === notification)) {
            friend.notifications.push(notification);
            messageModel.newMessage = true;
        }

        friendRelation.messages.push(messageModel);
        this.updateById(friend, friend);

        return Promise.resolve(messageModel);
    }
}

module.exports = UserData;

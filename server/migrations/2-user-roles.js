'use strict';

module.exports.id = "user-roles";

module.exports.up = function (done) {
  this.db
    .collection("users")
    .find().toArray().then(users => {
      return Promise.all(
        users.map(user => {
          user.roles = [user.role];
          delete user.role;
          return this.db.collection('users').updateOne(user);
        })
      ).then(() => done());
    });
};

module.exports.down = function (done) {
  this.db
    .collection("users")
    .find()
    .toArray()
    .then(users => {
      return Promise.all(
        users.map(user => {
          user.role = user.roles[0];
          delete user.roles;
          return this.db.collection("users").updateOne(user);
        })
      ).then(() => done());
    });
};

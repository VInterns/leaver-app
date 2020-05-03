'use strict';

module.exports.id = "user-roles";

module.exports.up = function (done) {
  this.db
    .collection("users")
    .find().toArray().then(users => {
      return Promise.all(
        users.map(user => {
          console.log(users.length);
          user.roles = [user.role];
          delete user.role;
          console.log(user);
          return this.db.collection('users').updateOne({ username: user.username }, user);
        })
      ).then(() => done()).catch(err => {
        console.error(err);
      })
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
          return this.db.collection("users").updateOne({ username: user.username }, user);
        })
      ).then(() => done());
    });
};

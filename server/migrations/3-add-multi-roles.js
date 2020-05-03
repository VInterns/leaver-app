"use strict";

module.exports.id = "add-multi-roles";

module.exports.up = function (done) {
  this.db
    .collection("users")
    .findOne({ username: "manager1@vodafone.com" })
    .then(user => {
      user.roles = [...user.roles, "admin"];
      return this.db.collection("users").updateOne({ username: user.username }, user);
    })
    .then(() => done()).catch(err => { console.error(err) });
};

module.exports.down = function (done) {
  this.db.collection("users")
    .findOne({ username: "manager1@vodafone.com" })
    .then(user => {
      user.roles.splice(user.roles.length - 1, 1);
      return this.db.collection("users").updateOne({ username: user.username }, user);
    }).then(() => done());
};

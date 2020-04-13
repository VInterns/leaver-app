"use strict";

module.exports.id = "add-multi-roles";

module.exports.up = function (done) {
  this.db
    .collection("users")
    .findOne({ username: "manager1@vodafone.com" })
    .then(user => {
      user.roles = [...user.roles, "admin"];
      return this.db.collection("users").updateOne(user);
    })
    .then(() => done());
};

module.exports.down = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  done();
};

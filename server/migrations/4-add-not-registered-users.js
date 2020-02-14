'use strict';

const bcrypt = require('bcryptjs');

module.exports.id = "add-not-registered-users";

module.exports.up = function (done) {
  this.db
    .collection("users")
    .insertOne({
      username: "logistics1@vodafone.com",
      roles: [
        "admin",
        "elt"
      ]
    })
    this.db
      .collection("users")
      .insertOne({
        username: "consumer1@vodafone.com",
        roles: [
          "admin",
          "ccca"
        ]
      })
    .then(() => done());
};

module.exports.down = function (done) {
  this.db
    .collection("users")
    .drop()
    .then(() => done());
};
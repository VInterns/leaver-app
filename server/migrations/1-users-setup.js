"use strict";

const bcrypt = require("bcryptjs");

module.exports.id = "users-setup";

module.exports.up = function(done) {
  let salt = bcrypt.genSaltSync();
  this.db
    .collection("users")
    .insertOne({
      username: "admin@hr.com",
      password: bcrypt.hashSync("hradmin", salt),
      role: "admin"
    })
  this.db
  .collection("users")
  .insertOne({
    username: "manager1@vodafone.com",
    password: bcrypt.hashSync("manager1", salt),
    role:"manager"
  })
  this.db
  .collection("users")
  .insertOne({
    username: "hr1@vodafone.com",
    password: bcrypt.hashSync("hr1", salt),
    role: "hr"
  })
  this.db
  .collection("users")
  .insertOne({
    username: "security1@vodafone.com",
    password: bcrypt.hashSync("security1", salt),
    role: "sht"
  })
  .then(() => done());

};

module.exports.down = function(done) {
  this.db
    .collection("users")
    .drop()
    .then(() => done());
};

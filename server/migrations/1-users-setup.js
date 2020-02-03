"use strict";

const bcrypt = require("bcryptjs");

module.exports.id = "users-setup";

module.exports.up = function (done) {
    let salt = bcrypt.genSaltSync();
    this.db
        .collection("users")
        .insertOne({
            username: "admin@hr.com",
            password: bcrypt.hashSync("hradmin", salt),
            role: "admin"
        })
        .then(() => done());
};

module.exports.down = function (done) {
    this.db
        .collection("users")
        .drop()
        .then(() => done());
};

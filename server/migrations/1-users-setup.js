"use strict";

const bcrypt = require("bcryptjs");

module.exports.id = "users-setup";


/* Test Purpose Only:: to be stored from signup page */
////////////////////////////////////////
let users = [
  {
    name: "admin@hr.com",
    pass: "hradmin",
    role : "admin"
  },
  {
    name: "mo.adel@nu.edu.eg",
    pass: "123456",
    role: "hr"
  },
  {
    name: "abokahfa@gmail.com",
    pass: "789101",
    role: "wf"
  },
  {
    name: "ahmedsomaa@aucegypt.edu",
    pass: "111213",
    role: "ast"
  }
]

//////////////////
let admins = users.map (user => {
  let admin = {};
  admin['username'] = user.name;
  admin['password'] = bcrypt.hashSync(user.pass, bcrypt.genSaltSync());
  admin['role'] = user.role;
  return admin;
})

////////////////////////////////////////

module.exports.up = function(done) {
  //let salt = bcrypt.genSaltSync();
  this.db
    .collection("users")
    .insertMany(admins)
    .then(() => done());
    /* .insertOne({
      username: "admin@hr.com",
      password: bcrypt.hashSync("hradmin", salt),
      role: "admin"
    })
    .then(() => done()); */
};

module.exports.down = function(done) {
  this.db
    .collection("users")
    .drop()
    .then(() => done());
};

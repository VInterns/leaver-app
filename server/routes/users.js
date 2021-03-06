const bcrypt = require("bcryptjs");
const express = require("express");

const fs = require('fs');

const {
  ensureLoggedIn,
  ensureHasRole
} = require("../middlewares/authentication");
const { getHtmlBody } = require('../utilities');
let mailer = require('../services/mail');

module.exports = db => {
  const router = new express.Router();
  const collection = "employees";

  router.get("/", ensureLoggedIn, (req, res) => {
    db.collection(collection).findOne(
      { staffId: Number(req.query.id) },
      (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).send({ err: 'Unable to perform action' });
        } else res.status(200).send(results);
      }
    );
  });

  router.post("/search", ensureLoggedIn, function (
    req,
    res
  ) {
    db.collection(collection)
      .findOne({ staffId: Number(req.body.staffId) })
      .then(user => {
        if (!user) {
          console.info(`User with staffID: ${req.body.staffId} not Found`)
          res.status(404).send();
        } else {
          res.json(user);
        }
      });
  });

  router.post(
    "/bulkregister",
    ensureLoggedIn,
    ensureHasRole(["admin"]),
    (req, res) => {
      const emplyees_columns = [
        "staffId",
        "name",
        "managerUsername",
        "department",
        "costCenter",
        "jobTitle",
        "hiringDate",
        "username",
        "nationalId"
      ];
      const users_columns = ["username", "staffId", "roles"];
      let checker = (arr, target) => target.every(v => arr.includes(v)); //To check if all elements exist
      if (
        //Check if all the required columns exist in the header
        req.body.jsonData.length == 0 ||
        (req.body.collection === "employees" &&
          (Object.keys(req.body.jsonData[0]).length !=
            emplyees_columns.length ||
            !checker(Object.keys(req.body.jsonData[0]), emplyees_columns))) ||
        (req.body.collection === "users" &&
          (Object.keys(req.body.jsonData[0]).length != users_columns.length ||
            !checker(Object.keys(req.body.jsonData[0]), users_columns)))
      ) {
        res.status(400).send();
        res.end();
      } else {
        if (req.body.collection === "users") {
          for (let index = 0; index < req.body.jsonData.length; index++) {
            req.body.jsonData[index].roles = req.body.jsonData[index].roles.split(",");
            req.body.jsonData[index].lastUpdatedOn = new Date();
          }
        }
        db.collection(req.body.collection).insertMany(
          req.body.jsonData,
          function (err1, result) {
            if (err1) {
              console.error(err);
              res.status(500).send({ err: 'Unable to perform action' });
            } else {
              if (req.body.collection === "users") {

                // Mail Notification
                for (let index = 0; index < req.body.jsonData.length; index++) {
                  const row = req.body.jsonData[index];
                  let { username, staffId } = row;
                  let scope = { name: getFirstName(username), staffId, signupUrl: '' };
                  let subject = `Welcome ${scope.name} to Vodafone Outsource Leaver App`;
                  let htmlBodyPromise = getHtmlBody('signup.html', scope).then((htmlBody) => {
                    mailer.sendEmail([username], subject, htmlBody, () => {
                      console.info(`Signup email sent to ${email}`);
                    })
                  })
                }
              }
              res.status(200).send({ msg: 'Ok' });
            }
          }
        );
      }
    }
  );

  router.post(
    "/addPassword",
    (req, res) => {
      req.body.password = bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync()
      );

      db.collection("users").updateOne(
        { username: req.body.username },
        { $set: { password: req.body.password } },
        function (err) {
          if (err) {
            console.error(err);
            return res.status(500).json({
              msg: "Failed to update document."
            });
          } else {
            return res.status(200).json({
              msg: "Document successfully updated."
            });
          }
        }
      );
    }
  );

  return router;
};


const getFirstName = (email) => {
  let initailSuffix = email.split('@')[0];
  if (initailSuffix.includes('.')) {
    return initailSuffix.split('.')[0]
  }
  return initailSuffix;
}
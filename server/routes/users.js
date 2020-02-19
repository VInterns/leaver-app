const bcrypt = require("bcryptjs");
const express = require("express");
const {
  ensureLoggedIn,
  ensureHasRole
} = require("../middlewares/authentication");
var XLSX = require("xlsx");

module.exports = db => {
  const router = new express.Router();
  const collection = "employees";

  router.get("/", ensureLoggedIn, (req, res) => {
    db.collection(collection).findOne(
      { staffId: Number(req.query.id) },
      (error, results) => {
        if (error) {
          res.status(500).send();
        } else res.status(200).send(results);
      }
    );
  });
  let roles = {};
  router.post("/search", ensureLoggedIn, ensureHasRole(["admin"]), function (
    req,
    res
  ) {
    db.collection(collection)
      .findOne({ staffId: Number(req.body.staffId) })
      .then(user => {
        if (!user) {
          res.status(404).end();
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
        "managerName",
        "ntAccount",
        "department",
        "careCenter",
        "jobTitle",
        "hiringDate",
        "mobile",
        "username"
      ];
      const users_columns = ["email", "staffId", "roles"];
      let checker = (arr, target) => target.every(v => arr.includes(v)); //To check if all elements exist
      if (
        //Check if all the required columns exist in the header
        req.body.jsonData.length == 0 ||
        (req.body.collection == "employees" &&
          (Object.keys(req.body.jsonData[0]).length !=
            emplyees_columns.length ||
            !checker(Object.keys(req.body.jsonData[0]), emplyees_columns))) ||
        (req.body.collection == "users" &&
          (Object.keys(req.body.jsonData[0]).length != users_columns.length ||
            !checker(Object.keys(req.body.jsonData[0]), users_columns)))
      ) {
        res.status(400).send();
        res.end();
      } else {
        db.collection(req.body.collection).insertMany(
          req.body.jsonData,
          function (err1, result) {
            if (err1) {
              res.status(500).send();
              res.end();
            } else {
              res.status(200).end();
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

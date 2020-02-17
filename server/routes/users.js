const bcrypt = require("bcryptjs");
const express = require("express");
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

  router.post("/search", ensureLoggedIn, function(req, res) {
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

  router.post("/bulkregister", ensureLoggedIn, (req, res) => {
    // db.collection(collection).drop();
    db.collection(req.body.collection).insertMany(req.body.jsonData, function(
      err1,
      result
    ) {
      if (err1) {
        console.log(req.body.jsonData);
        res.status(500).send();
        res.end();
      } else {
        res.status(200).end();
      }
    });
  });

  router.post("/addPassword", ensureLoggedIn, (req, res) => {
    req.body.password = bcrypt.hashSync(
      req.body.password,
      bcrypt.genSaltSync()
    );

    db.collection("users").updateOne(
      { username: req.body.username },
      { $set: { password: req.body.password } },
      function(err) {
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
  });

  return router;
};

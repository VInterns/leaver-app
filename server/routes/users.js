const bcrypt = require("bcryptjs");
const express = require("express");
var XLSX = require("xlsx");

module.exports = db => {
  const router = new express.Router();
  const collection = "employees";

  router.get("/", (req, res) => {
    db.collection(collection).findOne(
      { staffId: Number(req.query.id) },
      (error, results) => {
        if (error) {
          res.status(500).send();
        } else res.status(200).send(results);
      }
    );
  });

  router.post("/search", function (req, res) {
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

  router.post("/bulkregister", (req, res) => {
    // db.collection(collection).drop();
    db.collection(collection).insertMany(req.body, function (err1, result) {
      if (err1) {
        res.status(500).send();
        res.end();
      } else {
        res.status(200).end();
      }
    });
  });


  router.post("/register", (req,res) => {

    console.log(req.body)
    let newSystemUser = req.body;

    newSystemUser['password'] = bcrypt.hashSync(newSystemUser.password, bcrypt.genSaltSync())

    db.collection('users')
      .findOneAndUpdate({username: newSystemUser.email}, {$set: {"password": newSystemUser.password}}, function(err){
      if(err){
        res.status(500).json({
          "msg": "Failed to insert document."
        })
        res.end();
      } else{
        res.status(200).json({
          "msg" : "Document successfully inserted."
        })
      }
    })
  })
  
  return router;
};

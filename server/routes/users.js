const express = require("express");
var mongoxlsx = require("mongo-xlsx");
var XLSX = require("xlsx");

//TODO: Check the existing database, add only new? remove all the existing and add the new sheet?

module.exports = db => {
  const router = new express.Router();
  router.post("/bulkregister", (req, res) => {
    db.collection("users").insertMany(req.body, function(err1, result) {
      //Not functioning correctly
      if (err1) {
        res.status(500).send();
        res.end();
      } else {
        res.status(200).end();
      }
    });
  });
  return router;
};

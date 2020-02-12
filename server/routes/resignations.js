const { Router } = require("express");

module.exports = db => {
  const router = new Router();
  const collection = "resignations";

  router.get("/", (req, res) => {
    db.collection(collection)
      .find()
      .toArray((err, data) => {
        if (err) {
          res.status(500).send();
        } else {
          res.json(data);
        }
      });
  });

  router.post("/", function (req, res) {
    // check if resignatin request exists in db
    db.collection(collection)
      .findOne({ staffId: req.body.staffId })
      .then(resigReg => {
        if (!resigReg) {
          // Insert new resignation request
          db.collection(collection).insertOne(req.body, (err, result) => {
            if (err) {
              res.status(503).send({ error: "Insert to db error:(" });
              throw err;
            } else {
              res.status(200).send({ error: "Heeh :)" });
            }
          });
        } else {
          res
            .status(404)
            .send({ error: "Resignation Request already exists:(" });
        }
      });
  });

  router.post("/update/request", function (req, res) {
    var leaverId = req.body.staffId;
    db.collection(collection).findOneAndUpdate(
      { staffId: leaverId },
      {
        $set: { phase1: req.body.phase1 }
      },
      function (err, doc) {
        if (err) {
          res.status(404).send();
          throw err;
        } else {
          res.status(200).send({
            msg:
              "Employee successfully found, and resignation request updated data successfully updated"
          });
        }
      }
    );
  });

  router.get("/pending", (req, res) => {
    db.collection(collection)
      .find({ "phase4.status": "new" })
      .toArray((error, results) => {
        if (error) {
          console.error(`Failed to fetch data: ${err}`);
          res.status(500).send();
        } else {
          res.status(200).send(results);
        }
      });
  });

  router.get("/:id", (req, res) => {
    let urlSections = req.url.split("/");
    (urlSections[urlSections.length - 1] + "url");
    var query = { staffId: Number(urlSections[urlSections.length - 1]) };
    (query);
    db.collection(collection).findOne(query, (err, data) => {
      if (err) {
        (err);
        res.status(500).send();
      } else {
        (data);
        res.json(data);
      }
    });
  });

  router.post("/data", (req, res) => {
    let phase4 = {
      ratePlan: req.body.ratePlan,
      phoneBilledAmount: req.body.phoneBilledAmount,
      comment: req.body.comment,
      nationalId: req.body.nationalId,
      status: "done"
    };
    let myquery = {
      staffId: Number(req.query.id)
    };
    let newvalues = { $set: { phase4 } };
    db.collection(collection)
      .updateOne(myquery, newvalues)
      .then(result => {
        // (result);
        (`Successfully updated.`);
        res.status(200).send(true);
      })
      .catch(err => {
        console.error(`Failed to update: ${err}`);
        res.status(500).send();
      });
  });

  router.post("/national-id", (req, res) => {
    let phase4 = {
      nationalId: req.body
    };
    let myquery = { staffId: req.query.id };
    let newvalues = { $set: { phase4 } };
    // db.collection(collection).updateOne(myquery, newvalues)
    //     .then(result => {
    //         (`Successfully added a national id.`)
    //         res.status(200).send(true);
    //     })
    //     .catch(err => {
    //         console.error(`Failed to add national id: ${err}`)
    //         res.status(500).send();

    //     })
    res.status(200).send({ msg: "hi" });
  });

  router.get('/myresigns/:createdby', (req, res) => {
    let urlSections = req.url.split("/");
    (urlSections[urlSections.length - 1] + "url");
    // var query = { staffId: Number(urlSections[urlSections.length - 1]) };
    // (query);
    // db.collection(collection).find({ "createdby": "admin@hr.com" }).toArray((err, requests) => {
    db.collection(collection).find({ "createdby": urlSections[urlSections.length - 1] }).toArray((err, requests) => {
      if (err) {
        res.status(500).send();
        throw err;
      }
      else {
        res.send(requests);
      }
    });
  });

  router.get('/wf/fetchRequests', (req, res) => {
    db.collection(collection).find({ "status": "new" }).toArray((err, requests) => {
      if (err) {
        res.status(500).send();
        throw err;
      }
      else {
        res.send(requests);
      }
    });
  });

  router.post('/wf/insertBalance', (req, res) => {
    var leaverId = req.body.staffId;

    (req.body.phase3);

    db.collection(collection).updateOne({ "staffId": leaverId }, {
      $set: { "phase3": req.body.phase3 }
    }, (err, doc) => {
      if (err) {

        res.status(500).send(doc);
        throw err;
      }
      else {

        res.send("Employee data updated!!");
      }
    });
  });

  router.post("/update/phase6", function (req, res) {
    var leaverId = req.body.staffId;
    db.collection(collection).findOneAndUpdate(
      { staffId: leaverId },
      {
        $set: { phase6: req.body.phase6 }
      },
      function (err, doc) {
        if (err) {
          res.status(404).send();
          throw err;
        } else {
          res.status(200).send({
            msg:
              "employee successfully found, and security data successfully updated"
          });
        }
      }
    );
  });

  router.post("/update/phase2", function (req, res) {
    var leaverId = req.body.staffId;
    db.collection(collection).findOneAndUpdate(
      { staffId: leaverId },
      {
        $set: { phase2: req.body.phase2 }
      },
      function (err, doc) {
        if (err) {
          res.status(404).send();
          throw err;
        } else {
          res.status(200).send({
            msg:
              "Employee successfully found, and SMC data successfully updated"
          });
        }
      }
    );
  });

  router.post("/update/phase7", function (req, res) {
    var leaverId = req.body.staffId;
    db.collection(collection).findOneAndUpdate(
      { staffId: leaverId },
      {
        $set: { phase7: req.body.phase7 }
      },
      function (err, doc) {
        if (err) {
          res.status(404).send();
          throw err;
        } else {
          res.status(200).send({
            msg:
              "employee successfully found, and security data successfully updated"
          });
        }
      }
    );
  });

  router.post("/resignations", (req, res) => {
    db.collection(collection).update(req.body, (err, res) => {
      if (err) {
        throw err
      } else {
        return res.send('done')
      }
    })
  });


  router.post(
    "/uploadHandler/",
    (req, res) => {
      res.send({ responseText: "req.file.path" }); // You can send any response to the user here
    }
  );
  return router;
};

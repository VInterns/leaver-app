const { Router } = require("express");

module.exports = (db) => {

    const router = new Router();

    const collection = 'resignations';

    router.post('/addresignation', function (req, res) {
        console.log('toot-server')
        console.log(req.body);

        // check if resignatin request exists in db
        db.collection(collection)
        .findOne({ staffId: req.body.staffId })
        .then(resigReg => {
          if (!resigReg) {
            console.log("New Resignation Request");
            // Insert new resignation request
            db.collection(collection)
            .insertOne(req.body, (err, result) =>{
              if (err) {
                console.log("Insert Error");
                res.status(503).send({ error: "Insert to db error:(" });
                throw err;
              }
              console.log("insertedCount: " + result['insertedCount']);
              res.status(200).send({ error: "Heeh :)" });
            });
          } else {
            console.log("Request already exists");
            res.status(404).send({ error: "Resignation Request already exists:(" });
          }
        });
    });
    return router;
}

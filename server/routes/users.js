const { Router } = require('express');

module.exports = (db) => {
  const router = new Router();
  const collection = "users";

  router.get('/', (req, res) => {
    db.collection(collection)
      .findOne({ "staffId": Number(req.query.id) }, (error, results) => {
        if (error) {

          console.error(`Failed to fetch data: ${err}`)
          res.status(500).send();
        }
        else
          res.status(200).send(results);
      });
  });

  return router
}
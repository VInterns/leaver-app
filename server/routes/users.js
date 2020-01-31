const { Router } = require('express');

module.exports = (db) => {
  const router = new Router();
  const collection = "users";

  router.get('/', (req, res) => {
    db.collection(collection)
      .findOne({ "staffId": Number(req.query.id) }, (error, results) => {
        if (error) throw error;
        res.status(200).send(results);
      });
  });

  return router
}
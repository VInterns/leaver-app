const { Router } = require("express");

module.exports = (db) => {

    const router = new Router();
    router.get("/", (req, res) => {
        db.collection('resignations').find().toArray((err, data) => {
            if (err) {
                res.status(500).send();
            } else {
                res.json(data);
            }
        })
    });

    return router;
};

const { Router } = require("express");

module.exports = (db) => {

    const router = new Router();
    router.get("/", (req, res) => {
        db.collection('resignations').find().toArray((err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send();
            } else {
                console.log(data);
                res.json(data);
            }
        })
    });

    return router;
};

const express = require("express");
var mongoxlsx = require('mongo-xlsx');


module.exports = (db) => {
    const collection = "users";

    const router = new express.Router();

    router.post('/bulkregister', function (req, res) {
        res.send();
    });
    router.post('/search', function (req, res) {
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

    return router;
};


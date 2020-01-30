const express = require("express");
var mongoxlsx = require('mongo-xlsx');


module.exports = (db) => {
    const collection = "users";

    const router = new express.Router();

    router.post('/bulkregister', function (req, res) {
        console.log(req.file);
        console.log(req.body);
        res.send();
    });
    router.post('/search', function (req, res) {
        console.log('toot-server')
        console.log(req.body);
        db.collection(collection)
            .findOne({ staffId: req.body.staffId })
            .then(user => {
                if (!user) {
                    console.log("ID Not found");
                    res.status(404).send({});
                } else {
                    res.json(user);
                }
            });
    });

    return router;
};


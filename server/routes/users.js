const express = require("express");
var mongoxlsx = require('mongo-xlsx');


module.exports = (db) => {
    const collection = "users";

    const router = new express.Router();
    const temp = {
        "sapID":"12",
        "employeeName":"21",
        "managerName":"212",
        "ntAccount":"54",
        "department":"21",
        "careCenter":"89",
        "jobTitle":"222",
        "hiringDate":"12",
        "mobNumber":"121391",
      };

    router.post('/bulkregister', function (req, res) {
        console.log(req.file);
        console.log(req.body);
        // mongoxlsx.xlsx2MongoData(req.body, null, function (err, data) {
        //     if (err) {
        //         console.log(err, "error");
        //         res.status(500).send();
        //     } else {

        //         db.collection('users').insertMany(data, function (err1, result) {
        //             if (err1) {
        //                 console.log(err1, "error1");
        //                 res.status(500).send();
        //             } else {

        //                 res.send({});
        //             }
        //         });
        //     }
        // });

        res.send();
    });
    router.post('/search', function (req, res) {
        console.log('toot-server')
        console.log(req.body);
        db.collection(collection)
          .findOne(req.body)
          .then(user => {
            if (!user) {
                console.log("ID Not found");
                return;
            }
            res.json(user);
        });
        // res.json(user);
    });

    return router;
};



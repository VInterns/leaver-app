const express = require("express");
var mongoxlsx = require('mongo-xlsx');


module.exports = (db) => {
    const router = new express.Router();
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
    return router;
};
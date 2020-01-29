const express = require("express");
var mongoxlsx = require('mongo-xlsx');

//TODO: Got the data from file.body and upload it to DB
//How to check the data?
module.exports = (db) => {
    const router = new express.Router();
    router.post('/bulkregister', (req, res) => {
        // console.log(req.file);
        // console.log(req.body);
        console.log('From Server, file recieved')
        db.collection('users').insertMany(req.body, function (err1, result) { //Not functioning correctly
            console.log(req)
            // if (err1) {
            //     // console.log(err1, "error1");
            //     res.status(500).send();
            // } else {

            //     res.send({});
            // }
        });
        res.json({Dummy: 1});
    });
    return router;
};
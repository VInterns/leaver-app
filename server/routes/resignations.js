const { Router } = require("express");

module.exports = (db) => {
    const router = new Router();
    const collection = "resignations";

    router.get('/pending', (req, res) => {
        db.collection(collection)
            .find({ "phase4.status": "new" }).toArray((error, results) => {
                //TODO Handle DB errors
                res.status(200).send(results);
            });

    });

    router.post('/data', (req, res) => {
        //TODO Naming convensions
        let phase4 = {
            rateplan: req.body.rateplan,
            phonebilledamount: req.body.phonebilledamount,
            comment: req.body.comment,
            status: "done"
        }
        let myquery = { "staffId": Number(req.query.id) };
        let newvalues = { $set: { phase4 } };
        // Check if updated or not then send error
        db.collection(collection).updateOne(myquery, newvalues);
        res.status(200).send(true);
    });

    router.post('/national-id', (req, res) => {
        let phase4 = {
            nationalid: req.body
        }
        let myquery = { "staffId": Number(req.query.id) };
        let newvalues = { $set: { phase4 } };
        // Check if updated or not then send error
        db.collection(collection).updateOne(myquery, newvalues);
        res.status(200).send(true);
    });

    return router;
};

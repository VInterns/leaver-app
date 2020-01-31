const { Router } = require("express");

module.exports = (db) => {
    const router = new Router();
    const collection = "resignations";

    router.get('/pending', (req, res) => {
        db.collection(collection)
            .find({ "phase4.status": "new" }).toArray((error, results) => {
                if (error) throw error;
                res.status(200).send(results);
            });

    });

    router.post('/data', (req, res) => {
        let phase4 = {
            ratePlan: req.body.ratePlan,
            phoneBilledAmount: req.body.phoneBilledAmount,
            comment: req.body.comment,
            nationalId: req.body.nationalId,
            status: "done"
        }
        let myquery = { "staffId": Number(req.query.id) };
        let newvalues = { $set: { phase4 } };
        db.collection(collection).updateOne(myquery, newvalues)
            .then(result => {
                console.log(`Successfully updated.`)
                res.status(200).send(true);
            })
            .catch(err => console.error(`Failed to update: ${err}`))
    });

    router.post('/national-id', (req, res) => {
        let phase4 = {
            nationalId: req.body
        }
        let myquery = { "staffId": Number(req.query.id) };
        let newvalues = { $set: { phase4 } };
        db.collection(collection).updateOne(myquery, newvalues)
            .then(result => {
                console.log(`Successfully added a national id.`)
                res.status(200).send(true);
            })
            .catch(err => console.error(`Failed to add national id: ${err}`))

    });

    return router;
};

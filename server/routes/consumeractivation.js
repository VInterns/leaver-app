const { Router } = require("express");

module.exports = (db) => {
    const router = new Router();
    router.route('/pending')
        .get((req, res) => {
            var collection = db.collection('resignations');
            collection.find({ "phase4.status": "pending" }).toArray((x, results) => {
                res.status(200).send(results);
            })

        });
    router.route('/data')
        .get((req, res) => {
            var collection = db.collection('resignations');

            collection.find({ "staffid": Number(req.query.id) }).toArray((x, results) => {
                res.status(200).send(results);
            })

        });
    router.route('/data')

        .post((req, res) => {

            var phase4 = {
                rateplan: req.body.rateplan,
                phonebilledamount: req.body.phonebilledamount,
                comment: req.body.comment,
                status: "done"
            }
            var myquery = { "staffid": Number(req.query.id) };
            var newvalues = { $set: { phase4 } };
            db.collection("resignations").updateOne(myquery, newvalues);
            res.status(200).send(true);


        });
    router.route('/nationalid')

        .post((req, res) => {

            var phase4 = {
                nationalid: req.body
            }
            console.log(req.body)
            var myquery = { "staffid": Number(req.query.id) };
            var newvalues = { $set: { phase4 } };
            db.collection("resignations").updateOne(myquery, newvalues);
            res.status(200).send(true);



        });

    return router;
};

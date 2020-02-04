const { Router } = require("express");

module.exports = (db) => {

    const router = new Router();
    router.post("/", (req, res) => {
        // ('Backend:: FOUND')

        var leaverId = req.body.id;

        db.collection('users').findOne({"staffId" : leaverId}, (err, result) => {
            if (err) {
                throw err
            } else {
                /* (req.body)
                (result) */
                return res.json(result);
            }
        })
    });
    router.post("/update", (req, res) => {
        // ('HEY')
        var leaverId = req.body.staffId;
        db.collection('resignations').findOneAndUpdate({"staffId": leaverId},
            {$set: {"phase5" : req.body.phase5}}, (err, result) => {
            if (err) {
                throw err
            } else {
                /* (req.body)
                (result) */
                res.status(200).send({
                    "msg": "phase 5 updated successfully"
                })
            }
        })
    });
    return router;
};
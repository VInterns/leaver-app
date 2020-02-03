const { Router } = require("express");

module.exports = (db) => {

    const router = new Router();
    router.post("/", (req, res) => {
        console.log('Backend:: FOUND')

        var leaverId = req.body.id;

        db.collection('resignations').findOne({"staffId" : leaverId}, (err, result) => {
            if (err) {
                throw err
            } else {
                /* console.log(req.body)
                console.log(result) */
                return res.json(result);
            }
        })
    });
    router.post("/update", (req, res) => {
        console.log('HEY')
        var leaverId = req.body.staffId;
        db.collection('resignations').findOneAndUpdate({"staffId": leaverId},
            {$set: {"phase5" : req.body.phase5}}, (err, result) => {
            if (err) {
                throw err
            } else {
                /* console.log(req.body)
                console.log(result) */
                res.status(200).send({
                    "msg": "phase 5 updated successfully"
                })
            }
        })
    });
    return router;
};
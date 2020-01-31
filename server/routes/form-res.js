const { Router } = require("express");

module.exports = (db) => {

    const router = new Router();
    router.post("/", (req, res) => {
        console.log('FOUND')
        db.collection('resignations').findOne({id : req.body.id}, (err, result) => {
            if (err) {
                throw err
            } else {
                console.log(req.body)
                console.log(result)
                return res.json(result);
            }
        })
    });
    router.post("/update", (req, res) => {
        console.log('HEY')
        db.collection('resignations').updateOne({comment : req.body.comment}, (err, result) => {
            if (err) {
                throw err
            } else {
                console.log(req.body)
                console.log(result)
                return res.json(result);
            }
        })
    });
    return router;
};
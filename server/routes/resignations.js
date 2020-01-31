const { Router } = require("express");

module.exports = (db) => {

    const router = new Router();
    router.post("/resignations", (req, res) => {
        db.collection('resignations').update(req.body, (err, res) => {
            if (err) {
                throw err
            } else {
                return res.send('done')
            }
        })
    });
    router.get("/", (req, res) => {
        console.log("aaaaaaaaaaaaaaaa");
        db.collection('resignations').find({}).toArray()
        .then(result => {
            // if (err) {
            //     throw err
            // } else {
                console.log("done");
                return res.json(result);
            })
        }
    );

    return router;
};


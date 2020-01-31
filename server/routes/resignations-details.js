const { Router } = require("express");

module.exports = (db) => {

    const router = new Router();
    router.get("/:id", (req, res) => {
        console.log(req.url.split('/')[1]);
        var query = { staffId: req.url.split('/')[1] };
        db.collection('resignations').findOne(query, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send();
            } else {
                console.log(data);
                res.json(data);
            }
        })
    });

    return router;
};

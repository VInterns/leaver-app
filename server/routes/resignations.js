const { Router } = require("express");

module.exports = (db) => {

    const router = new Router();
    const collection = 'resignations';
    router.get("/", (req, res) => {
        db.collection(collection).find().toArray((err, data) => {
            if (err) {
                res.status(500).send();
            } else {
                res.json(data);
            }
        })
    });

    router.get("/:id", (req, res) => {
        let urlSections = req.url.split('/');
        console.log(urlSections[urlSections.length - 1] + "url");
        var query = { staffId: urlSections[urlSections.length - 1] };
        console.log(query)
        db.collection(collection).findOne(query, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send();
            } else {
                console.log(data);
                res.json(data);
            }
        })
    });


    router.post('/', function (req, res) {
        // check if resignatin request exists in db
        db.collection(collection)
            .findOne({ staffId: req.body.staffId })
            .then(resigReg => {
                if (!resigReg) {
                    // Insert new resignation request
                    db.collection(collection)
                        .insertOne(req.body, (err, result) => {
                            if (err) {
                                res.status(503).send({ error: "Insert to db error:(" });
                                throw err;
                            } else {
                                res.status(200).send({ error: "Heeh :)" });
                            }
                        });
                } else {
                    res.status(404).send({ error: "Resignation Request already exists:(" });
                }
            });
    });

    return router;
};

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

    router.post('/update/phase6', function(req, res){
        
        var leaverId = req.body.staffId;
        db.collection(collection).findOneAndUpdate({"staffId": leaverId}, {
            $set: {"phase6": req.body.phase6}
        }, function(err, doc){
            if(err){
                res.status(404).send();
                throw err;
            }
            else {
                res.status(200).send({
                    "msg": "employee successfully found, and security data successfully updated"
                })
            }
        })
    })

    return router;
};

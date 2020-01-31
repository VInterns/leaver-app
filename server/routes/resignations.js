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

    router.get('/wf/fetchRequests', (req, res) => {
        var collection = db.collection(collection);
        collection.find({"status": "Pending"}).toArray((err, requests) => {
            if(err) {
                res.status(500).send();
                throw err;
            }
            else{
                res.send(requests);
            }
        })
    })

    router.post('/wf/insertBalance', (req, res) => {
        var collection = db.collection(collection);
        var leaverId = req.body.staffId;

        console.log(req.body.phase3);

        collection.updateOne({"staffId": leaverId}, {
                    $set: {"phase3": req.body.phase3} }, (err, doc) => {
                    if(err){
                        
                        res.status(500).send(doc);
                        throw err;
                    }
                    else {

                        res.send("Employee data updated!!")
                    }
        })
    });

return router;
}

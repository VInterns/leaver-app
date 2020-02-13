const { Router } = require("express");

module.exports = (db) => {

    const router = new Router();
    router.get("/", (req, res) => {
        // Any Body can use the db here
        // ex: db.collection('COLLECTION_NAME');
        res.json({ environment: process.env.NODE_ENV });
    });

    router.post("/verifyCode", (req, res) => {
        //console.log("/info/verifyCode", req.body)
        db.collection('verification-codes').findOne({email: req.body.email}, function(err, record){
            if(err) throw err;
            if(record.code === req.body.toVerify){
                return res.status(200).json({
                    "response": "Code Verified"
                })
            } else {
                return res.status(400).json({
                    "response": "Code not Verified"
                })
            }
        })
    })
    return router;
};


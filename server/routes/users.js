const express = require("express");
var mongoXlsx = require('mongo-xlsx');


module.exports  = (db) => {
    const router = new express.Router();
    router.post('/bulkregister', function(req, res) {
        console.log(req.file)
        mongoxlsx.xlsx2MongoData(req.file.path, null, function(err, data) {
            if(err){
                res.status(500).send();
            }
        db.collection('users').insertMany(data), function(err1, result) {
            if(err1){
                res.status(500).send();
            }
        }
    });
});
    return router;
};
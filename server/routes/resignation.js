const { Router } = require("express");

module.exports = (db) => {

    const router = new Router();

    const collection = 'resignations';

    router.post('/addresignation', function (req, res) {
        console.log('toot-server')
        console.log(req.body);
        db.collection(collection)
          .insertOne(req.body, (err, res) =>{
            if (err) throw err;
            console.log("1 document inserted");
            // res.send.Status(200);

          }); 
    });
    return router;
}

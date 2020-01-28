var multer = require("multer");
var mongoXlsx = require('mongo-xlsx');
const { Router } = require("express");

module.exports = (db) => {
    const router = new Router();
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "public");
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
            var xlsx = './public/' + file.originalname;
            var model = null;
            mongoXlsx.xlsx2MongoData(xlsx, model, function (err, data) {
                console.log(data);

                const collection = db.collection('users');
                collection.insertMany(data, function (err, result) {
                });

            });
        }
    });
    var upload = multer({ storage: storage }).array("file");

    router.route('/excel')
        .post((req, res) => {

            upload(req, res, function (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(500).json(err);
                } else if (err) {
                    return res.status(500).json(err);
                }
                return res.status(200).send(req.file);
            });

        })


    return router;
};

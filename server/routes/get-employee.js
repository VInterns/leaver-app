const { Router } = require("express");

module.exports = (db) => {
    const router = new Router();
    router.get('/', function (req, res) {
        console.log('toot-server')
        console.log(req.body);


        res.send();
    });
    return router;
};
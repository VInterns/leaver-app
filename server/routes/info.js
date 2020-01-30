const { Router } = require("express");

module.exports = (db) => {

    const router = new Router();
    router.get("/", (req, res) => {
        // Any Body can use the db here
        // ex: db.collection('COLLECTION_NAME');
        res.json({ environment: process.env.NODE_ENV });
    });

    return router;
};


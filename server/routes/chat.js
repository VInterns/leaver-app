const express = require("express");
const {getDB} = require('../db')


    const router = new express.Router();

    router.post("/", (req, res) => {
        //console.log("****",getDB())
        var db = getDB()
        db.collection('messages').insertOne(req.body, (err, msg)=>{
            if (err)
            {
                throw err
            }else{
                return res.send('hi')
            }
        })
        //return res.send('hi')
    });
    module.exports = router;


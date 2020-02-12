"use strict";

const {getDB} = require('../db');
//////////////////////////////////////////////


const isValidUser = function(req, res, next) {

    let user = req.body;

    let db = getDB();

    db.collection('users').findOne({username: user.mailList}, function(err, document){
        if(err){ return next(err); } 

        if(!document){ return next(null, false)}
        else{
            return next(null, document);
        }
    })
}

//////////////////////////////////////////////
module.exports = {isValidUser}
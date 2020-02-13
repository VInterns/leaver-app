const {getDB} = require('../db');

/****************************************************************************/
const isValidUser = function(req, res, next){

    let db = getDB();
    let searchEmail = req.body.mailList;

    db.collection('users')
        .findOne({username: searchEmail})
        .then((user) => {
            if(!user){
                console.log("[-] user not allowed to register");
                return res.status(403).json({
                    "response": `[-] user with ${searchEmail} not allowed to register in this system`
                })
            } else{
                console.log('[+] user allowed to register');
                return next();
            }
        })
}

/****************************************************************************/
module.exports = {isValidUser}
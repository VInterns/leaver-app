"use strict";
const nodemailer = require("nodemailer");
const { getDB } = require("../db");



let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secure: false,
    port: 587,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    },
    tls: {
        ciphers:'SSLv3'
    }
})

/////////////////////////////////////////////////////////////
const sendMail = async function (req, res) {

    /* Email Options Setup */
    let options = {
        from: "abokahfa@outlook.com",
        to: req.body.mailList,
        subject: req.body.subject,
        text: req.body.text
    }

    /* SendMail */
    transporter.sendMail(options, function(err, info){

        if(err){

            console.log(err);

            /* Error Message Setup */
            let errorMessage = {
                "error": "Couldn't send message",
                "response": ""
            }

            /* Error Response */
            let resCode = err.responseCode;
            let smtpResponse = err.response;

            /* Error Response Check */
            if(resCode != undefined){
                errorMessage["response"] = `${smtpResponse}`;
            } else{
                errorMessage["response"] = `${err}`;
            }       

            return res.status(400).json(errorMessage);
        }
        else{

    /**
     * bind code to email
     * store it into db
    */
    let record = {
        email: req.body.mailList,
        code: req.body.code
    }

    let _db = getDB();
    let collection = "codes";

    _db.collection(collection).insertOne(record, function (err) {
        if (err) {
            throw err;
        }
        else {
            // _db.close();
            return res.status(200).json({
                // "response": `Message successfully sent to ${info.envelope.to}`,
                // "messageId": `${info.messageId}`
            })
        }
    })

    }

    })
}

/////////////////////////////////////////////////////////////

const sendPhaseUpdate = function(req, res){

    let sendTo = [];
    let db = getDB();
    let query = { roles: {$in: ['hr', 'manager']}};

    db.collection('users')
        .find(query)
        .toArray((err, users) => {
            if(err) throw err;

            sendTo = users.map(user => {
                return user.username
            })

            let options = {
                from: process.env.USER,
                to : sendTo,
                subject: "Phase Update",
                text: "Phase Updated"
            }

            transporter.sendMail(options, (err, info) => {
                if(err) {
                    return console.log(err);
                }
                else {
                    return res.json({
                        "response": `email sent to ${info.envelope.to}`
                    })
                }
            })
        })
    
}
/////////////////////////////////////////////////////////////
module.exports = { sendMail, sendPhaseUpdate}


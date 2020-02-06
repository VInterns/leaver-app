"use strict";
const nodemailer = require("nodemailer");
const {getDB} = require("../db");

/////////////////////////////////////////////////////////////
const sendMail = async function(req, res){

    /* Transporter Setup */
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
        },
        connectionTimeout: 30000,
    })

    /* Email Options Setup */
    let options = {
        from: process.env.USER,
        to: req.body.mailList,
        subject: "Greetings",
        text: "Greetings from Vodafone."
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
            return res.status(200).json({
                "response": `Message successfully sent to ${info.envelope.to}`,
                "messageId": `${info.messageId}`
            });
        }
        
    })
}

/////////////////////////////////////////////////////////////
const getMailList = function (req, res) {
    
    let _db = getDB();
    let query = {
        $or: [
            {role : "hr"},  // HR
            {role: "ast"},  // Application Security Team
            {role: "wf"},   // Work Force Team
            {role: "elt"},  // Enterprise Logistics Team
            {role: "ccca"}, // CC Consumer Activations Team
            {role: "smc"},  // Customer Care Team
            {role: "shwt"}  // Security HW Token Team
        ]
    };
    let collection = "users";

    _db.collection(collection)
        .find(query, { password: false, usename: true, role: true})
        .toArray((err, admins) => {
            if(err){
                throw err;
            } else {

                /* Return only emails */
                let list = admins.map(admin => {
                    return admin.username;
                })

                return res.json(list);
            }
        })
}

/////////////////////////////////////////////////////////////
module.exports = {sendMail, getMailList}

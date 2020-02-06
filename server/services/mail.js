"use strict";
const nodemailer = require("nodemailer");

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
module.exports = {sendMail}
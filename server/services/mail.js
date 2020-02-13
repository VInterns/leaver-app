"use strict";
const nodemailer = require("nodemailer");
const { getDB } = require("../db");

/////////////////////////////////////////////////////////////
const sendMail = async function (req, res) {

    /* Transporter Setup */
    /* let transporter = nodemailer.createTransport({
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
        // connectionTimeout: 30000,
    }) */

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        auth: {
            type: 'oAuth2',
            user: 'abokahfa@gmail.com',
            clientId: '421036610858-s65n7sbd5mat5m4t53hau6ba49n67ogp.apps.googleusercontent.com',
            clientSecret: 'jmWV8nEeO9AUWS8EvJJYzxUV',
            refreshToken: '1//04ah6dK_ZWvp8CgYIARAAGAQSNwF-L9IrVVCoe9X-NCVt2Linnyc20oZP2S3LdqZ9B98fd0gpcOFSBg8yTM-G_tq2hka2Fhu2LiY'
        }
    })

    /* Email Options Setup */
    let options = {
        from: "abokahfa@gmail.com",
        to: req.body.mailList,
        subject: req.body.subject,
        text: req.body.text
    }

    /* SendMail */
    // transporter.sendMail(options, function(err, info){

    //     if(err){

    //         console.log(err);

    //         /* Error Message Setup */
    //         let errorMessage = {
    //             "error": "Couldn't send message",
    //             "response": ""
    //         }

    //         /* Error Response */
    //         let resCode = err.responseCode;
    //         let smtpResponse = err.response;

    //         /* Error Response Check */
    //         if(resCode != undefined){
    //             errorMessage["response"] = `${smtpResponse}`;
    //         } else{
    //             errorMessage["response"] = `${err}`;
    //         }       

    //         return res.status(400).json(errorMessage);
    //     }
    //     else{

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

    //     }

    // })
}

/////////////////////////////////////////////////////////////
const getMailList = function (req, res) {

    let _db = getDB();
    let query = {
        $or: [
            { role: "hr" },  // HR
            { role: "ast" },  // Application Security Team
            { role: "wf" },   // Work Force Team
            { role: "elt" },  // Enterprise Logistics Team
            { role: "ccca" }, // CC Consumer Activations Team
            { role: "smc" },  // Customer Care Team
            { role: "shwt" }  // Security HW Token Team
        ]
    };
    let collection = "users";

    _db.collection(collection)
        .find(query, { password: false, username: true, role: true })
        .toArray((err, admins) => {
            if (err) {
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


const sendCode = function (req, res) {
    return res.status(200).json({
        "msg": "sendCode Reached!!"
    })
}
/////////////////////////////////////////////////////////////
module.exports = { sendMail, getMailList, sendCode }

"use strict";
require('dotenv').config();

const nodemailer = require("nodemailer");
const { getDB } = require("../db");
const { getFromEmail } = require("../utilities");


const fromEmail = getFromEmail();

let hotmailTransporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secure: false,
    port: 587,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    },
    tls: {
        ciphers: 'SSLv3'
    }
})

let gmailTransporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        type: 'oAuth2',
        user: fromEmail,
        clientId: '849051165442-gmqv3barpd07r9hui6dn6nt0074lh5sj.apps.googleusercontent.com',
        clientSecret: 'HNPPrnlhQbnrftJMk5jn6vGy',
        refreshToken: '1//04ZyR-viFqs2vCgYIARAAGAQSNwF-L9IrRSZXXamO8gVPbdlyl_aBmRKNwg0VwAShfLSuMg-agvYnAd_Kcr_qdumNCV7S8hmYxuo'
    }
})
/////////////////////////////////////////////////////////////

const sendPhaseUpdate = function (req, res) {

    let sendTo = [];
    let db = getDB();
    let query = { roles: { $in: ['hr', 'manager'] } };

    db.collection('users')
        .find(query)
        .toArray((err, users) => {
            if (err) throw err;

            sendTo = users.map(user => {
                return user.username
            })

            let options = {
                from: fromEmail,
                to: sendTo,
                subject: "Phase Update",
                text: "Phase Updated"
            }

            gmailTransporter.sendMail(options, (err, info) => {
                if (err) {
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
const sendEmail = (toMailList, subject, htmlbody, callBack, errCallBack = () => { }) => {


    // TODO: make the mail template ready

    let mailOptions = {
        from: fromEmail,
        to: toMailList,
        subject: subject,
        html: htmlbody
    };

    console.log('mailOptions:', mailOptions)

    gmailTransporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            errCallBack();
            throw error;
        } else {
            callBack();
            console.log("Email sent: " + info.response);
        }
    });
}

module.exports = {sendPhaseUpdate, sendEmail }


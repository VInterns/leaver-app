"use strict";
require("dotenv").config();

const nodemailer = require("nodemailer");
const { getFromEmail } = require("../utilities");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const fromEmail = getFromEmail();

// let hotmailTransporter = nodemailer.createTransport({
//     host: "smtp-mail.outlook.com",
//     secure: false,
//     port: 587,
//     auth: {
//         user: process.env.USER,
//         pass: process.env.PASS
//     },
//     tls: {
//         ciphers: 'SSLv3'
//     }
// })

// let gmailTransporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     auth: {
//         type: 'oAuth2',
//         user: fromEmail,
//         clientId: '849051165442-gmqv3barpd07r9hui6dn6nt0074lh5sj.apps.googleusercontent.com',
//         clientSecret: 'HNPPrnlhQbnrftJMk5jn6vGy',
//         refreshToken: '1//04ZyR-viFqs2vCgYIARAAGAQSNwF-L9IrRSZXXamO8gVPbdlyl_aBmRKNwg0VwAShfLSuMg-agvYnAd_Kcr_qdumNCV7S8hmYxuo'
//     }
// })

/////////////////////////////////////////////////////////////

const sendEmail = (
  toMailList,
  subject,
  htmlbody,
  callBack,
  errCallBack = () => { }
) => {
  // TODO: @Islam make the mail template ready

  let msg = {
    from: fromEmail,
    to: toMailList,
    subject: subject,
    html: htmlbody
  };

  console.info("Message:", msg);

  sgMail.send(msg, function (err) {
    if (err) {
      console.error(err);
    }
    else {
      console.info("Email Sent");
    }
  });
};

module.exports = { sendEmail };

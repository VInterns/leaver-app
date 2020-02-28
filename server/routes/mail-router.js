const router = require("express").Router();
const mailer = require("../services/mail");
const { getDB } = require('../db');
const { getHtmlBody } = require('../utilities');
const { isValidUser } = require('../middlewares/user-validate');


////////////////////////////////////////////
router.route("/sendMail")
    .post(isValidUser, (req, res) => {

        let code = req.body.code;
        let email = req.body.mailList;
        let subject = req.body.subject;

        let record = {
            email: email,
            code: code
        }

        let _db = getDB();
        _db.collection('codes')
            .insertOne(record, (err) => {
                if (err) {
                    throw err;
                } else {
                    res.status(200).send({ success: `Code successfully sent to ${email}` });
                    let scope = {code};
                    let htmlBodyPromise = getHtmlBody('signup-code.html', scope).then((htmlBody) => {
                        mailer.sendEmail(email, subject, htmlBody, () => {
                            console.log(`Verification Code Sent to ${toMailList}`)
                        })
                    })
                }
            })
    });

////////////////////////////////////////////
module.exports = router;
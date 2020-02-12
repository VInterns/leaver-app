const router = require("express").Router();
const mailer = require("../services/mail");

////////////////////////////////////////////
router.route("/sendMail")
    .post(pass,mailer.sendMail);

router.route("/getMailList")
    .get(mailer.getMailList)

router.route("/sendCode")
    .post(mailer.sendCode)

////////////////////////////////////////////
module.exports = router;
const router = require("express").Router();
const mailer = require("../services/mail");

////////////////////////////////////////////
router.route("/sendMail")
    .post(mailer.sendMail);

router.route("/getMailList")
    .get(mailer.getMailList)

////////////////////////////////////////////
module.exports = router;
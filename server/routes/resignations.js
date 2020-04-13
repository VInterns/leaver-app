const { Router } = require("express");

const mailer = require("../services/mail");
const { getHtmlBody, getMailingList } = require("../utilities");
const {
  ensureLoggedIn,
  ensureHasRole
} = require("../middlewares/authentication");

module.exports = db => {
  const router = new Router();
  const collection = "resignations";

  // TODO: Also HR should be able to access this endpoint
  router.get("/", ensureLoggedIn, ensureHasRole(["admin"]), (req, res) => {
    db.collection(collection)
      .find()
      .toArray((err, data) => {
        if (err) {
          res.status(500).send();
        } else {
          res.json(data);
        }
      });
  });

  router.delete(
    "/delete-request/:id",
    ensureLoggedIn,
    ensureHasRole(["admin"]),
    function (req, res) {
      let urlSections = req.url.split("/");
      let staffId_ = urlSections[urlSections.length - 1];
      db.collection(collection).deleteOne(
        { staffId: Number(staffId_) },
        (err, result) => {
          if (err) {
            res.json({
              status: 409,
              message: "Resignation Request could not be deleted"
            });
            throw err;
          }
          console.log("1 document deleted");
          res.json({
            status: 200,
            message: "Resignation Request deleted"
          });

          // Mail Notifications
          // TODO: add other teams roles & employee email to the mailList
          let request = req.body.request;
          let subject = `Resignation Request Cancelled for Staff ID# ${request.staffId}`;
          let query = { roles: { $in: ["hr", "vendor", "manager"] } };
          let toMailListPromise = getMailingList(query).then(mailList => {
            let scope = {
              name: request.name,
              staffId: request.staffId,
              managerName: request.managerName,
              lastDay: request.phase1.lastWorkDay
            };
            let htmlBodyPromise = getHtmlBody(
              "initial-vendor-notification.html",
              scope
            ).then(htmlBody => {
              mailer.sendEmail(mailList, subject, htmlBody, () => {
                console.log(
                  `Resignation Request Deletion Email Sent to ${toMailList}`
                );
              });
            });
          });
        }
      );
    }
  );

  router.post("/", ensureLoggedIn, ensureHasRole(["admin"]), function (
    req,
    res
  ) {
    db.collection(collection)
      .findOne({ staffId: req.body.staffId })
      .then(resigReg => {
        if (!resigReg) {
          db.collection(collection).insertOne(req.body, (err, result) => {
            if (err) {
              res.status(503).send({ error: "Insert to db error:(" });
              throw err;
            } else {
              res.status(200).send({ error: "Heeh :)" });
              db.collection("employees")
                .findOne({ staffId: req.body.staffId })
                .then(employee => {
                  employee.mobile = req.body.mobile;
                  db.collection("employees").updateOne(employee);
                });
              // Mail Notifications
              // TODO: add other teams roles & employee email to the mailList
              let subject = `New Resignation Request for Staff ID# ${req.body.staffId}`;
              let query = { roles: { $in: ["hr", "vendor", "manager"] } };
              let toMailListPromise = getMailingList(query).then(mailList => {
                let scope = {
                  name: req.body.name,
                  staffId: req.body.staffId,
                  managerName: req.body.managerName,
                  lastDay: req.body.phase1.lastWorkDay
                };
                let htmlBodyPromise = getHtmlBody(
                  "initial-vendor-notification.html",
                  scope
                ).then(htmlBody => {
                  mailer.sendEmail(mailList, subject, htmlBody, () => {
                    console.log(
                      `Resignation Request Creation Email Sent to ${toMailList}`
                    );
                  });
                });
              });
            }
          });
        } else {
          res
            .status(404)
            .send({ error: "Resignation Request already exists:(" });
        }
      });
  });

  // Update Phase 1
  // TODO:
  //    - Only manager and Admin Should access this endpoint
  //    - change the method to be PUT
  //    - url to be "/"
  //    - to be Generic for all updates
  router.post(
    "/update/request",
    ensureLoggedIn,
    ensureHasRole(["admin"]),
    function (req, res) {
      var leaverId = req.body.staffId;
      db.collection(collection).findOneAndUpdate(
        { staffId: leaverId },
        {
          $set: { phase1: req.body.phase1 }
        },
        function (err, doc) {
          if (err) {
            res.status(404).send();
            throw err;
          } else {
            // Mail Notifications
            // TODO: add any other required emails to mailingList
            let searchQuery = { roles: { $in: ["hr", "vendor"] } };
            let mailListPromise = getMailingList(searchQuery).then(
              mailingList => {
                let scope = {
                  staffId: leaverId,
                  lastDay: req.body.phase1.lastWorkDay
                };
                let htmlBodyPromise = getHtmlBody(
                  "update-last-work-day.html",
                  scope
                ).then(htmlBody => {
                  let subject = `Last Work Day Update for Staff ID#${leaverId}`;
                  mailer.sendEmail(mailingList, subject, htmlBody, () => {
                    console.log(
                      `Last Work Day Update for Staff ID#${leaverId} sent to ${mailingList}.`
                    );
                  });
                });
              }
            );

            res.status(200).send({
              msg:
                "Employee successfully found, and resignation request updated data successfully updated"
            });
          }
        }
      );
    }
  );

  // TODO:
  //    - Mention where this url is being used
  //    - Admin all other roles should be able to access it and view their requests / assigned requests only
  router.get(
    "/pending",
    ensureLoggedIn,
    ensureHasRole(["admin"]),
    (req, res) => {
      db.collection(collection)
        .find()
        .toArray((error, results) => {
          if (error) {
            console.error(`Failed to fetch data: ${err}`);
            res.status(500).send();
          } else {
            res.status(200).send(results);
          }
        });
    }
  );

  // TODO:
  //    - Mention where this url is being used
  //    - Check who should have access to this endpoint
  router.get("/:id", ensureLoggedIn, ensureHasRole(["admin"]), (req, res) => {
    let urlSections = req.url.split("/");
    urlSections[urlSections.length - 1] + "url";
    var query = { staffId: Number(urlSections[urlSections.length - 1]) };
    query;
    db.collection(collection).findOne(query, (err, data) => {
      if (err) {
        err;
        res.status(500).send();
      } else {
        data;
        res.json(data);
      }
    });
  });

  // Update Phase 4
  // TODO:
  //    - To be deleted and move its functionality to the only update method above.
  router.post("/data", ensureLoggedIn, ensureHasRole(["admin"]), (req, res) => {
    let myquery = {
      staffId: Number(req.query.id)
    };
    let phase4 = req.body.phase4;
    let newvalues = {
      $set: {
        phase4: phase4,
        status: req.body.status
      }
    };
    db.collection(collection)
      .updateOne(myquery, newvalues)
      .then(result => {
        /******* MAIL NOTIFICATION *******/
        // TODO: add any other required emails
        if (phase4.status === "done") {
          let searchQuery = { roles: { $in: ["hr", "manager"] } };
          let mailListPromise = getMailingList(searchQuery).then(emails => {
            let scope = {
              staffId: req.query.id,
              teamName: "CC  Consumer Activation"
            };
            let htmlBodyPromise = getHtmlBody("phase-update.html", scope).then(
              htmlBody => {
                let subject = `Phase Update for Staff ID #${req.body.id}`;
                mailer.sendEmail(emails, subject, htmlBody, () => {
                  console.log(`Phase update email sent to ${emails}`);
                });
              }
            );
          });
        } else {
          console.log("Phase 4 is not done yet.");
        }

        res.status(200).send(true);
      })
      .catch(err => {
        console.error(`Failed to update: ${err}`);
        res.status(500).send();
      });
  });

  // TODO: @Islam
  //    - make it more clear and add more description to what is happening here.
  //    - remove it from here to separte route.
  router.post(
    "/national-id",
    ensureLoggedIn,
    ensureHasRole(["admin"]),
    (req, res) => {
      res.status(200).send({ msg: "hi" });
    }
  );

  // TODO:
  //    - Change url to be "my"
  //    - req.user got all user details
  router.get(
    "/myresigns/:createdby",
    ensureLoggedIn,
    ensureHasRole(["admin"]),
    (req, res) => {
      let urlSections = req.url.split("/");
      urlSections[urlSections.length - 1] + "url";
      db.collection(collection)
        .find({ createdby: urlSections[urlSections.length - 1] })
        .toArray((err, requests) => {
          if (err) {
            res.status(500).send();
            throw err;
          } else {
            res.send(requests);
          }
        });
    }
  );

  // TODO:
  //    - To be deleted and use the global generic one.
  router.get(
    "/wf/fetchRequests",
    ensureLoggedIn,
    ensureHasRole(["admin"]),
    (req, res) => {
      db.collection(collection)
        .find()
        .toArray((err, requests) => {
          if (err) {
            res.status(500).send();
            throw err;
          } else {
            res.send(requests);
          }
        });
    }
  );

  // Update Phase 3
  // TODO:
  //    - To be deleted and use the global generic one.
  router.post(
    "/wf/insertBalance",
    ensureLoggedIn,
    ensureHasRole(["admin"]),
    (req, res) => {
      var leaverId = req.body.staffId;
      db.collection(collection).updateOne(
        { staffId: leaverId },
        {
          $set: { phase3: req.body.phase3, status: req.body.status }
        },
        (err, doc) => {
          if (err) {
            res.status(500).send(doc);
            throw err;
          } else {
            /******* MAIL NOTIFICATION *******/
            // TODO: add any other required emails
            if (req.body.phase3.status === "done") {
              let searchQuery = { roles: { $in: ["hr", "manager"] } };
              let mailListPromise = getMailingList(searchQuery).then(emails => {
                let scope = { staffId: leaverId, teamName: "Work Force" };
                let htmlBodyPromise = getHtmlBody(
                  "phase-update.html",
                  scope
                ).then(htmlBody => {
                  let subject = `Phase Update for Staff ID #${leaverId}`;
                  mailer.sendEmail(emails, subject, htmlBody, () => {
                    console.log(`Phase update email sent to ${emails}`);
                  });
                });
              });
            } else {
              console.log("Phase 3 is not done yet.");
            }

            res.send("Epmolyee data updated");
          }
        }
      );
    }
  );

  // Update phase 8
  // TODO:
  //    - To be deleted and use the global generic one.
  router.post("/update/cs", ensureLoggedIn, ensureHasRole(["admin"]), function (
    req,
    res
  ) {
    var leaverId = req.body.staffId;
    db.collection(collection).findOneAndUpdate(
      { staffId: leaverId },
      {
        $set: {
          phase8: req.body.phase8,
          status: req.body.status
        }
      },
      function (err, doc) {
        if (err) {
          res.status(404).send();
          throw err;
        } else {
          //req.body.phase8.status === 'done' && mailer.sendPhaseUpdate();

          /******* MAIL NOTIFICATION *******/
          // TODO: add any other required emails
          if (req.body.phase8.status === "done") {
            let searchQuery = { roles: { $in: ["hr", "manager"] } };
            let mailListPromise = getMailingList(searchQuery).then(emails => {
              let scope = { staffId: leaverId, teamName: "Corporate Security" };
              let htmlBodyPromise = getHtmlBody(
                "phase-update.html",
                scope
              ).then(htmlBody => {
                let subject = `Phase Update for Staff ID #${leaverId}`;
                mailer.sendEmail(emails, subject, htmlBody, () => {
                  console.log(`Phase update email sent to ${emails}`);
                });
              });
            });

            // check if all phases are done
            if (req.body.status === "done") {
              let searchQuery = { roles: { $in: ["hr", "manager", "vendor"] } };
              let mailListPromise = getMailingList(searchQuery).then(emails => {
                let scope = { staffId: leaverId };
                let htmlBodyPromise = getHtmlBody(
                  "resignation-done.html",
                  scope
                ).then(htmlBody => {
                  let subject = `Resignation Request for Staff ID #${leaverId} Finished`;
                  mailer.sendEmail(emails, subject, htmlBody, () => {
                    console.log(
                      `Resignation Request finish email sent to ${emails}`
                    );
                  });
                });
              });
            } else {
              console.log(
                `Resignation Request for Staff ID #${leaverId} hasn't finished yet.`
              );
            }
          } else {
            console.log("Phase 8 is not done yet.");
          }

          res.status(200).send({
            msg:
              "employee successfully found, and corporate security data successfully updated"
          });
        }
      }
    );
  });

  // Update phase 6
  // TODO:
  //    - To be deleted and use the global generic one.
  router.post(
    "/update/phase6",
    ensureLoggedIn,
    ensureHasRole(["admin"]),
    function (req, res) {
      var leaverId = req.body.staffId;
      db.collection(collection).findOneAndUpdate(
        { staffId: leaverId },
        {
          $set: {
            phase6: req.body.phase6,
            status: req.body.status
          }
        },
        function (err, doc) {
          if (err) {
            res.status(404).send();
            throw err;
          } else {
            /******* MAIL NOTIFICATION *******/
            // TODO: add any other required emails
            if (req.body.phase6.status === "done") {
              let searchQuery = { roles: { $in: ["hr", "manager"] } };
              let mailListPromise = getMailingList(searchQuery).then(emails => {
                let scope = {
                  staffId: leaverId,
                  teamName: "Application Security"
                };
                let htmlBodyPromise = getHtmlBody(
                  "phase-update.html",
                  scope
                ).then(htmlBody => {
                  let subject = `Phase Update for Staff ID #${leaverId}`;
                  mailer.sendEmail(emails, subject, htmlBody, () => {
                    console.log(`Phase update email sent to ${emails}`);
                  });
                });
              });
            } else {
              console.log("Phase 6 is not done yet.");
            }

            res.status(200).send({
              msg:
                "employee successfully found, and security data successfully updated"
            });
          }
        }
      );
    }
  );

  // Update phase 2
  // TODO:
  //    - To be deleted and use the global generic one.
  router.post(
    "/update/phase2",
    ensureLoggedIn,
    ensureHasRole(["admin"]),
    function (req, res) {
      var leaverId = req.body.staffId;
      db.collection(collection).findOneAndUpdate(
        { staffId: leaverId },
        {
          $set: { phase2: req.body.phase2 }
        },
        function (err, doc) {
          if (err) {
            res.status(404).send();
            throw err;
          } else {
            /******* MAIL NOTIFICATION *******/
            // TODO: add any other required emails
            if (req.body.phase2.status === "done") {
              let searchQuery = { roles: { $in: ["hr", "manager"] } };
              let mailListPromise = getMailingList(searchQuery).then(emails => {
                let scope = { staffId: leaverId, teamName: "SMC" };
                let htmlBodyPromise = getHtmlBody(
                  "phase-update.html",
                  scope
                ).then(htmlBody => {
                  let subject = `Phase Update for Staff ID #${leaverId}`;
                  mailer.sendEmail(emails, subject, htmlBody, () => {
                    console.log(`Phase update email sent to ${emails}`);
                  });
                });
              });
            } else {
              console.log("Phase 2 is not done yet.");
            }

            res.status(200).send({
              msg:
                "Employee successfully found, and SMC data successfully updated"
            });
          }
        }
      );
    }
  );

  // Update phase 7
  // TODO:
  //    - To be deleted and use the global generic one.
  router.post(
    "/update/phase7",
    ensureLoggedIn,
    ensureHasRole(["admin"]),
    function (req, res) {
      var leaverId = req.body.staffId;
      db.collection(collection).findOneAndUpdate(
        { staffId: leaverId },
        {
          $set: {
            phase7: req.body.phase7,
            status: req.body.status
          }
        },
        function (err, doc) {
          if (err) {
            res.status(404).send();
            throw err;
          } else {
            /******* MAIL NOTIFICATION *******/
            // TODO: add any other required emails
            if (req.body.phase7.status === "done") {
              let searchQuery = { roles: { $in: ["hr", "manager"] } };
              let mailListPromise = getMailingList(searchQuery).then(emails => {
                let scope = {
                  staffId: leaverId,
                  teamName: "Software Hardware Token"
                };
                let htmlBodyPromise = getHtmlBody(
                  "phase-update.html",
                  scope
                ).then(htmlBody => {
                  let subject = `Phase Update for Staff ID #${leaverId}`;
                  mailer.sendEmail(emails, subject, htmlBody, () => {
                    console.log(`Phase update email sent to ${emails}`);
                  });
                });
              });
            } else {
              console.log("Phase 7 is not done yet.");
            }

            res.status(200).send({
              msg:
                "employee successfully found, and security data successfully updated"
            });
          }
        }
      );
    }
  );

  // TODO:
  //    - Could you please check where its being used and explain
  //    - update what is needed and delete if there is a generic one
  router.post(
    "/resignations",
    ensureLoggedIn,
    ensureHasRole(["admin"]),
    (req, res) => {
      db.collection(collection).update(req.body, (err, res) => {
        if (err) {
          throw err;
        } else {
          res.status(200).send({
            msg:
              "employee successfully found, and security data successfully updated"
          });
          return res.send("done");
        }
      });
    }
  );

  // Update phase 5
  // TODO:
  //    - To be deleted and use the global generic one.
  router.post(
    "/update/phase5",
    ensureLoggedIn,
    ensureHasRole(["admin"]),
    (req, res) => {
      var leaverId = req.body.staffId;
      db.collection(collection).findOneAndUpdate(
        { staffId: leaverId },
        {
          $set: { phase5: req.body.phase5 }
        },
        (err, result) => {
          if (err) {
            throw err;
          } else {
            /******* MAIL NOTIFICATION *******/
            // TODO: add any other required emails
            if (req.body.phase5.status === "done") {
              let searchQuery = { roles: { $in: ["hr", "manager"] } };
              let mailListPromise = getMailingList(searchQuery).then(emails => {
                let scope = {
                  staffId: leaverId,
                  teamName: "Enterprise Logistics"
                };
                let htmlBodyPromise = getHtmlBody(
                  "phase-update.html",
                  scope
                ).then(htmlBody => {
                  let subject = `Phase Update for Staff ID #${leaverId}`;
                  mailer.sendEmail(emails, subject, htmlBody, () => {
                    console.log(`Phase update email sent to ${emails}`);
                  });
                });
              });
            } else {
              console.log("Phase 5 is not done yet.");
            }

            res.status(200).send({
              msg: "phase 5 updated successfully"
            });
          }
        }
      );
    }
  );

  // Update phase 7
  // TODO:
  //    - To be deleted and use the global generic one.
  router.post(
    "/uploadHandler/",
    ensureLoggedIn,
    ensureHasRole(["admin"]),
    (req, res) => {
      res.send({ responseText: "req.file.path" }); // You can send any response to the user here
    }
  );

  return router;
};

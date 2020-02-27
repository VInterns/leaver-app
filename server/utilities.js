const cfServices = require("cf-services");
const { getDB } = require('./db');
const fs = require('fs');
const mustache = require("mustache");

/////////////////////////////////////////////////////////////
const getDatabaseUrl = () => {
  try {
    return cfServices("leaver-db").credentials.uri;
  } catch (err) {
    return process.env.DATABASE_URL || "mongodb://localhost:27017/leaver-db";
  }
};

/////////////////////////////////////////////////////////////
const getFromEmail = () => {
  return process.env.EMAIL || 'hashad.d2d@gmail.com';
}

/////////////////////////////////////////////////////////////
const getPort = () => {
  return normalizePort(process.env.PORT || '3000');
};

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/////////////////////////////////////////////////////////////
const getMailingList = (query) => {

  let db = getDB();
  let mailingList = [];

  return new Promise((resolve, reject) => {
    db.collection('users')
      .find(query)
      .toArray((err, users) => {
        if (err) reject(err);

        mailingList = users.map(user => {
          return user.username;
        })

        resolve( mailingList);

      });

  });

}

/////////////////////////////////////////////////////////////
getHtmlBody = (templateName, scope) => {
  return new Promise ((resolve, reject) => {
    fs.readFile(`${__dirname}/templates/${templateName}`, 'utf8', function (err, mailTemplate) {
      if (err) reject (err);
      resolve (mustache.render(mailTemplate, scope));
    })
  })  
}

module.exports = {
  getPort,
  getDatabaseUrl,
  getFromEmail,
  getMailingList,
  getHtmlBody
};

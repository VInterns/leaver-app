require('dotenv').config();
const connectMongo = require("connect-mongo");
const debug = require("debug")("server");
const http = require("http");

const { getDatabaseUrl, getPort } = require("./utilities");
const port = getPort();

const dbModule = require("./db");
const appFactory = require("./app");
let server;

dbModule.connect(
    getDatabaseUrl(),
    (err, db, client) => {
        if (err) {
            debug("Unable to connect to Mongo", err);
            return process.exit(1);
        }
        let app = appFactory(db, session => {
            const MongoStore = connectMongo(session);
            return new MongoStore({ client: client });
        });

        app.set("port", port);
        server = http.createServer(app);
        server.on("listening", onListening);
        server.listen(port);
    }
);

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}

function shutdown() {
    Promise.all([dbModule.close()])
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

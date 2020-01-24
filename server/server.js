require('dotenv').config()
const connectMongo = require("connect-mongo");
const debug = require("debug")("server");
const http = require("http");
const socketIO = require('socket.io');
const axios = require('axios');

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
            return new MongoStore({ client: client, dbName: "leaver-app" });
        });
        app.set("port", port);

        server = http.createServer(app);
        server.on("listening", onListening);
        /* create the websocket */
const io = socketIO(server)

io.on('connection', socket => {
  console.log('New client connected');
  
  /* send the messages to other users */ 
  socket.on('message', (data) => {
      axios.post('http://localhost:4000/api/chat', data, function(err, msg){
          if (err){
              throw err
          }else{
              console.log('Message Stored', msg)
          }
      })
    socket.broadcast.emit('commingMsg', data);
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
})
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

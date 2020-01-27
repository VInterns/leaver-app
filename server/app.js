const bodyParser = require("body-parser");
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const path = require("path");

var multer = require("multer");
var cors = require("cors");
var mongoXlsx = require('mongo-xlsx');

const { configureAuth } = require("./middlewares/authentication");

const infoRouter = require("./routes/info");
const chatRouter = require("./routes/chat");
const loginRouterFactory = require("./routes/login");


const appFactory = (db, sessionStoreProvider) => {
    const app = express();
    const API_ROOT_PATH = "/api";
    app.use(
        express.json({
            limit: "50mb"
        })
    );
    app.use(morgan("dev"));

    app.use(
        bodyParser.urlencoded({
            limit: "50mb",
            parameterLimit: 1000 * 1000 * 50,
            extended: true
        })
    );

    app.use(bodyParser.json({ limit: "50mb" }));
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    const sessionSettings = {
        cookie: {},
        resave: false,
        saveUninitialized: true,
        secret: "randomsecret" || process.env.SESSION_SECRET,
        store: sessionStoreProvider(session)
    };

    if (app.get("env") === "production") {
        app.enable("trust proxy");
        sessionSettings.cookie.secure = true;
        app.use("*", httpsOnly);
    }

    app.use(`${API_ROOT_PATH}/info`, infoRouter);
    app.use(`${API_ROOT_PATH}/chat`, chatRouter);

    // app.use(session(sessionSettings));

    // configureAuth(app, db);

    // app.use(`${API_ROOT_PATH}/login`, loginRouterFactory(db));

    app.use(express.static(path.join(__dirname, "static")));

    app.get("*", (req, res, next) => {
        if (req.url.startsWith(API_ROOT_PATH)) {
            return next();
        }
        res.sendFile(path.join(__dirname, "static/index.html"));
    });
    app.use(cors());
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "public");
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
            var xlsx = './public/' + file.originalname;
            var model = null;
            mongoXlsx.xlsx2MongoData(xlsx, model, function (err, data) {
                console.log(data);

                const collection = db.collection('users');
                // Insert some documents
                collection.insertMany(data, function (err, result) {
                });

            });
        }
    });
    //upload array of files
    var upload = multer({ storage: storage }).array("file");

    app.post("/upload", function (req, res) {
        console.log("lol");
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                return res.status(500).json(err);
                // A Multer error occurred when uploading.
            } else if (err) {
                return res.status(500).json(err);
                // An unknown error occurred when uploading.
            }

            return res.status(200).send(req.file);
            // Everything went fine.
        });
    });


    return app;
};

const httpsOnly = (req, res, next) => {
    if (!req.secure) {
        return res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
    }
    next();
};

module.exports = appFactory;

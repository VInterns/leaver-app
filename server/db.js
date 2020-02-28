const { MongoClient } = require("mongodb");

const state = {
    db: null,
    connection: null,
    client: null
};

const connect = function (url, callback = () => { }) {
    if (state.db) {
        callback(null, state.db, state.client);
        return Promise.resolve(state.db);
    }


    state.client = new MongoClient(
        url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
    return state.client.connect().then(connection => {
        state.connection = connection;
        return connection.db('leaver-app');
    })
        .then(db => {
            state.db = db;
            callback(null, db, state.client);
            return db;
        })
        .catch(err => {
            callback(err);
            throw err;
        });
};

const close = function (callback = () => { }) {
    if (!state.connection) {
        return Promise.resolve();
    }
    return state.connection.close(err => {
        state.connection = null;
        state.db = null;
        callback(err);
    });
};

const getDB = ()=>{
    return state.db;
}


module.exports = {getDB, connect, close};
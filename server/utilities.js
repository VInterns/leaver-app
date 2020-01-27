const getDatabaseUrl = () => {
    return process.env.DATABASE_URL || "mongodb://localhost:27017/leaver-app";
};

const getPort = () => {
    return normalizePort(process.env.PORT || "8080");
}
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

module.exports = {
    getPort,
    getDatabaseUrl
};

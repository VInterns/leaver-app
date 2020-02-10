const getDatabaseUrl = () => {
    return process.env.DATABASE_URL || "mongodb://leaver-web-app:hradmin!1@ds153494.mlab.com:53494/CloudFoundry_m7qr12so_siq44qr1";
};

const getPort = () => {
    return normalizePort(process.env.PORT || "3000");
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

const { getDatabaseUrl } = require("./server/utilities");

module.exports = {
    url: getDatabaseUrl(),
    directory: "./server/migrations"
};

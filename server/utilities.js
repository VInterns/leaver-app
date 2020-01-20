// const cfServices = require("cf-services");

const stringifyDate = date => new Date(date).toISOString();

const getDatabaseUrl = () => {
    return process.env.DATABASE_URL || "mongodb://localhost:27017/leaver-app";
};

module.exports = {
    getDatabaseUrl
};

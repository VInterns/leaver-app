const getDatabaseUrl = () => {
  return 'mongodb://ehab:mongopassword@vf-shard-00-00-4myzf.mongodb.net:27017,vf-shard-00-01-4myzf.mongodb.net:27017,vf-shard-00-02-4myzf.mongodb.net:27017/leaver-app?ssl=true&replicaSet=VF-shard-0&authSource=admin&retryWrites=true&w=majority';
};

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

module.exports = {
  getPort,
  getDatabaseUrl
};

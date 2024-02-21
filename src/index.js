require('dotenv').config();

process.on('uncaughtException', (err, origin) => {
    console.error(`Uncaught Exception:`);
    console.error(err);
    console.error(origin);
    throw err;
});

process.on('unhandledRejection', (reason, promise) => {
    console.error(`Unhandled Rejection:`);
    console.error(reason);
    console.error(promise);
    throw reason;
});

require('./server');

const app = require('../app');
const setupPort = require('../commons/setupPort');
const api = require('../apis/index');
const handleError = require('../commons/handleErrors');
//--------------------------------------------------------CONNECT MONGO---------------------------------------------------
const connectMongoose = require('../WebConfig');

connectMongoose.connectDB();
// cron.start();


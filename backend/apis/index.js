const app = require('../app');
const user = require('../routes/user');
const role = require('../routes/role');
const email = require('../routes/email');
const job = require('../routes/job');
const documentCV = require('../routes/documentCv');
const userJob = require('../routes/userJob');

app.use('/api/account', user);
app.use('/api/email', email);
app.use('/api/role', role);
app.use('/api/job', job);
app.use('/api/userJob', userJob);
app.use('/api/documentCV', documentCV);
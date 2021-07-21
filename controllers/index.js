const { Router, urlencoded } = require('express');
const app = Router();
const auth = require('./api/auth');
const users = require('./api/users');

app.use(urlencoded({ extended : true }));
app.use('/api/users', users);
app.use('/api/', auth);

app.get('/api', async (req, res) => await res.send('api'));

module.exports = app;
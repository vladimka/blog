const { Router } = require('express');
const app = Router();
const api = require('./api/');

app.use('/api', api);

module.exports = app;
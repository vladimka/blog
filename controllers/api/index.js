const express = require('express');
const app = express.Router();
const auth = require('./auth');
const { authCheck } = require('./utils');
const users = require('./users');
const posts = require('./posts');

app.use(express.urlencoded({ extended : true }));

app.get('/', async (req, res) => await res.send('api'));
app.get('/auth', auth.login);
app.get('/register', auth.register);

app.get('/users/:method', authCheck(), async (req, res) => {
    let { method } = req.params;

    return await users[method](req, res);
});

app.get('/posts/:method', authCheck(), async (req, res) => {
    let { method } = req.params;

    return await posts[method](req, res);
});

module.exports = app;
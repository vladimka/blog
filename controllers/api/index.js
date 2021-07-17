const { Router, urlencoded } = require('express');
const app = Router();
const auth = require('./auth');
const users = require('./users');
const posts = require('./posts');

app.use(urlencoded({ extended : true }));
app.use('/users', users);
app.use('/posts', posts);
app.use('/', auth);

app.get('/', async (req, res) => await res.send('api'));

module.exports = app;
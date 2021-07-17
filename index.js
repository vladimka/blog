const express = require('express');
const morgan = require('morgan');
const controllers = require('./controllers/');
const app = express();

app.use(morgan('dev'));
app.use('/', controllers);
app.use(express.static('./public'));

app.get('/', async (req, res) => await res.send('index'));
app.get('/login', async (req, res) => await res.sendFile(__dirname + '/public/login.html'));

app.listen(80, '0.0.0.0', err => {
    if(err)
        return console.error(err);

    console.log('Server started');
});
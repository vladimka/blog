const express = require('express');
const morgan = require('morgan');
const controllers = require('./controllers/');
const app = express();

app.use(morgan('dev'));
app.use('/api', controllers.api);

app.get('/', async (req, res) => await res.send('index'));

app.listen(80, '0.0.0.0', err => {
    if(err)
        return console.error(err);

    console.log('Server started');
});
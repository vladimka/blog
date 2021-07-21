const http = require('http');
const express = require('express');
const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);
const morgan = require('morgan');
const controllers = require('./controllers/');
const db = require('./db');
const jwt = require('jsonwebtoken');

async function verifyToken(token){
    if(!token)
        return { error : "No token passed" }

    let data = jwt.decode(token, 'secret');
    let user = db.get('users').find({ id : data.id }).value();

    if(!user)
        return { error : 'Invalid token', code : 1 }

    if(token !== user.token)
        return { error : 'Invalid token', code : 2 }

    return user;
}

app.use(morgan('dev'));
app.use('/', controllers);
app.use(express.static('./public'));

app.get('/', async (req, res) => await res.send('index'));
app.get('/login', async (req, res) => await res.sendFile(__dirname + '/public/login.html'));
app.get('/register', async (req, res) => await res.sendFile(__dirname + '/public/register.html'));

let clients = [];

io.on('connection', async socket => {
   console.log('connected');
   clients[socket] = {};

   socket.on('auth', async data => {
       let { token } = data;
       let verifiedToken = await verifyToken(token);

       if(verifiedToken.error)
            return console.log(verifiedToken.error);

       console.log('authorized');
       clients[socket] = await db.get('users').find({ id : verifiedToken.id }).value();

       socket.emit('info', verifiedToken);
   });

   socket.on('getInfo', async () => {
        socket.emit('info', clients[socket]);
   });

   socket.on('userWork', async () => {
        let user = clients[socket];
        console.log(`${user.name} has worked`);

        await db.get('users').find({ id : user.id }).assign({ balance : user.balance + user.ipc }).write();
   });
   
   socket.on('disconnect', async () => {
       console.log('disconnected');
       delete clients[socket];
       console.log(clients.length);
   });
});

server.listen(80, '0.0.0.0', err => {
    if(err)
        return console.error(err);

    console.log('Server started');
});
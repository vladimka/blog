const jwt = require('jsonwebtoken');
const db = require('../../db');
const { Router, urlencoded } = require('express');
const app = Router();

app.use(urlencoded({ extended : true }));

let paths = {
    login : async (req, res) => {
        let { login, password } = req.query;
        let user = db.get('users').find({ login }).value();
    
        if(!user || user.password !== password)
            return await res.status(500).json({ error : 'Login or password is invalid!' });

        let token = user.token || jwt.sign({ id : user.id }, 'secret');

        await db.get('users')
            .find({ id : user.id })
            .assign({ token })
            .write();
    
        await res.json({ token });
    },
    register : async (req, res) => {
        let data = req.query;
    
        if(!data.login || !data.password)
            return await res.json({ error : 'login or password expected' });
    
        if(db.get('users').find({ login : data.login }).value())
            return await res.json({ error : 'User with this login already exists' });
    
        await db.get('users')
            .push({
                id : db.get('users').value().length + 1,
                created_at : Date.now(),
                name : data.name,
                login : data.login,
                password : data.password,
                balance : 0,
                avatarUrl : ''
            })
            .write();
    
        await res.status(200).json({ status : 'ok' });
    }
}

app.post('/auth', paths.login);
app.post('/register', paths.register);

module.exports = app;
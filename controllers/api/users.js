const db = require('../../db');
const { Router } = require('express');
const app = Router();
const { authCheck } = require('./utils');

let methods = {
    get : async (req, res) => {
        let id = parseInt(req.query.user_id);
        let user = await db.get('users').find({ id }).value() || await db.get('users').find({ id : req.user.id }).value();
    
        if(!user)
            return await res.json({ error : 'User not found' });
    
        await res.json({ id : user.id, created_at : user.created_at, name : user.name, balance : user.balance });
    }
}

app.get('/:method', authCheck(), async (req, res) => {
    let { method } = req.params;

    return await methods[method](req, res);
});

module.exports = app;
const db = require('../../db');
const jwt = require('jsonwebtoken');

const authCheck = () => async (req, res, next) => {
    const token = req.query.token;

    if(!token)
        return await res.status(500).json({ error : 'Not authorized' });

    let data = jwt.decode(token, 'secret');
    let user = db.get('users').find({ id : data.id }).value();

    if(!user)
        return await res.json({ error : 'Invalid token', code : 1 });

    console.log(user.token);

    if(token !== user.token)
        return await res.json({ error : 'Invalid token', code : 2 });

    req.user = data;

    await next();
}

module.exports = {
    authCheck
}
const db = require('../../db');

module.exports = {
    get : async (req, res) => {
        let id = parseInt(req.query.user_id);
        let user = await db.get('users').find({ id }).value() || await db.get('users').find({ id : req.user.id }).value();
    
        if(!user)
            return await res.json({ error : 'User not found' });
    
        await res.json({ id : user.id, created_at : user.created_at, name : user.name });
    }
}
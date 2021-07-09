const { get, create } = require('../../db');
const db = require('../../db');
const jwt = require('jsonwebtoken');

module.exports = {
    async get(req, res){
        let query_params = req.query;
        delete query_params.token;

        if(query_params.id)
            query_params.id = parseInt(query_params.id);

        if(query_params.owner_id)
            query_params.owner_id = parseInt(query_params.owner_id);

        if(query_params.likes)
            query_params.likes = parseInt(query_params.likes);

        let posts = await db.get('posts').find(query_params).value();

        return await res.json(posts);
    },
    async create(req, res){
        if(!req.query.body)
            return await res.json({ error : 'Post body expected!' });

        let user_id = req.user.id;
        let post_id = db.get('posts').value().length + 1;

        await db.get('posts')
            .push({
                id : post_id,
                owner_id : user_id,
                created_at : Date.now(),
                body : req.query.body,
                likes : 0
            })
            .write();

        await res.json({ status : 'ok', post_id });
    }
}
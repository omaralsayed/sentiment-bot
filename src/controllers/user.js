const models = require('../models/user');

// GET user information
const getUser = async (req, res, next) => {
    const user = await models.user.findByPk(req.params.id);
    if(!user) {
        res.send(404);
    }
    else {
        res.send(user);
    }
}

// POST user information
const postUser = async (req, res, next) => {
    const data = req.body;
    const user = data;
    if (!req.params.id) {
        res.send(401)
    }
    else {
        res.send(user);
    }
}

module.exports = {
    getUser,
    postUser
}
const models = require('../models/profile');

// GET user profile
const getProfile = async (req, res, next) => {
    const profile = await models.profiles.findByPk(req.params.id);
    if(!profile) {
        res.send(404);
    }
    else {
        res.send(profile);
    }
}

// POST user profile
const postProfile = async (req, res, next) => {
    const data = req.body;
    const profile = data;
    if (!req.params.id) {
        res.send(401)
    }
    else {
        res.send(profile);
    }
}

module.exports = {
    getProfile,
    postProfile
}
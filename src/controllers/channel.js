const models = require('../models/channel');

// GET channel information
const getChannel = async (req, res, next) => {
    const channel = await models.channel.findByPk(req.params.id);
    if(!channel) {
        res.send(404);
    }
    else {
        res.send(channel);
    }
}

// POST channel information
const postChannel = async (req, res, next) => {
    const data = req.body;
    const channel = data;
    if (!req.params.id) {
        res.send(401);
    }
    else {
        res.send(channel);
    }
}

module.exports = {
    getChannel,
    postChannel
}
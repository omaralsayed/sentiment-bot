const Profile = require('./controllers/profile');
const Channel = require('./controllers/channel.js');
const User = require('./controllers/user.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

const express = require('express');
const parser = require('body-parser');
const app = express();
const port = 3000;

const models = require('./models');

models.sequelize.sync();

models.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});

app.use(parser())

app.get('/profile/:id', Profile.getProfile);
app.post('/profile', Profile.postProfile);

app.get('/user/:id', User.getUser);
app.post('/user', User.postUser);

app.get('/channel/:id', Channel.getChannel);
app.post('/channel', Channel.postChannel);

app.listen(port, () => console.log(`listening on port ${port}!`));
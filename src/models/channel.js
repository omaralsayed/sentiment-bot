const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

const channel = sequelize.define('channel', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    mood: {
      type: Sequelize.STRING,
      allowNull: false
    },
    time: {
        type: Sequelize.TIME,
        allowNull: false
      },
    lang: {
        type: Sequelize.STRING,
        allowNull: false
      }
  }, {
});

module.exports.channel = channel
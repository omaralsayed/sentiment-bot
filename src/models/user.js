const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

const user = sequelize.define('user', {
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
  }, {
});

exports.user = user
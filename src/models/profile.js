module.exports = function (sequelize, DataTypes) {

  var Profile = sequelize.define("Profile", 
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    r1: {
      type: DataTypes.STRING,
      allowNull: false
    },
    r2: {
        type: DataTypes.STRING,
        allowNull: false
      },
    r3: {
    type: DataTypes.STRING,
    allowNull: false
    },
    lang: {
        type: DataTypes.STRING,
        allowNull: false
      },
    related: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    {
      modelName: "profile"
    }
  );

  return Profile;
}
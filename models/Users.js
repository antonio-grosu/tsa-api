const models = require("../models");

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    xp: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateOfCreation: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    dateOfLastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });
  Users.associate = (models) => {
    Users.hasMany(models.OwnedBy, {
      onDelete: "cascade ",
    });
  };

  return Users;
};

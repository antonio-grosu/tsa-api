const models = require("../models");

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
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
    },
    {
      classMethods: {
        associate: (models) => {
          Users.hasMany(models.CreatedBy, {
            foreignKey: {
              name: "userId",
              allowNull: false,
              type: DataTypes.UUID,
            },
          });
          Users.hasMany(models.OwnedBy, {
            foreignKey: {
              name: "userId",
              allowNull: false,
              type: DataTypes.UUID,
            },
          });
        },
      },
    }
  );

  return Users;
};

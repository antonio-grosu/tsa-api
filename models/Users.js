const models = require("../models");

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
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
            foreignKey: "userId",
            as: "courses",
          });
          Users.hasMany(models.OwnedBy, {
            foreignKey: "userId",
            as: "courses",
          });
        },
      },
    }
  );

  return Users;
};

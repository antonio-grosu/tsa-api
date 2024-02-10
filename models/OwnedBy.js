const models = require("../models");

module.exports = (sequelize, DataTypes) => {
  const OwnedBy = sequelize.define(
    "OwnedBy",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
      },
      courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      classMethods: {
        associate: (models) => {
          OwnedBy.belongsTo(models.Users, {
            foreignKey: "userId",
            as: "user",
          });
          OwnedBy.belongsTo(models.Courses, {
            foreignKey: "courseId",
            as: "course",
          });
        },
      },
    }
  );

  return OwnedBy;
};

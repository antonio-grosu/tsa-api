const models = require("../models");

module.exports = (sequelize, DataTypes) => {
  const CreatedBy = sequelize.define(
    "CreatedBy",
    {
      id: {
        type: DataTypes.INTEGER,
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
          CreatedBy.belongsTo(models.Users, {
            foreignKey: "userId",
            as: "user",
          });
          CreatedBy.belongsTo(models.Courses, {
            foreignKey: "courseId",
            as: "course",
          });
        },
      },
    }
  );

  return CreatedBy;
};

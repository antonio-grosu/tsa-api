const models = require("../models");

module.exports = (sequelize, DataTypes) => {
  const CreatedBy = sequelize.define(
    "CreatedBy",
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
          CreatedBy.belongsTo(models.Users, {
            foreignKey: {
              name: "userId",
              allowNull: false,
              type: DataTypes.UUID,
            },
          });
          CreatedBy.belongsTo(models.Courses, {
            foreignKey: {
              name: "courseId",
              allowNull: false,
              type: DataTypes.UUID,
            },
          });
        },
      },
    }
  );

  return CreatedBy;
};

const models = require("../models");

module.exports = (sequelize, DataTypes) => {
  const Lessons = sequelize.define(
    "Lessons",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dateOfCreation: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      classMethods: {
        associate: (models) => {
          Lessons.belongsTo(models.Courses, {
            foreignKey: {
              name: "courseId",
              allowNull: false,
              type: DataTypes.UUID,
            },
          });
          Lessons.hasMany(models.Exercise, {
            foreignKey: {
              name: "lessonId",
              allowNull: false,
              type: DataTypes.UUID,
            },
          });
          Lessons.hasMany(models.Parts, {
            foreignKey: {
              name: "lessonId",
              allowNull: false,
              type: DataTypes.UUID,
            },
          });
        },
      },
    }
  );

  return Lessons;
};

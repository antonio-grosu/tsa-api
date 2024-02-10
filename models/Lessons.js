const models = require("../models");

module.exports = (sequelize, DataTypes) => {
  const Lessons = sequelize.define(
    "Lessons",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
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
            foreignKey: "courseId",
            as: "course",
          });
          Lessons.hasMany(models.Exercise, {
            foreignKey: "lessonId",
            as: "exercise",
          });
          Lessons.hasMany(models.Parts, {
            foreignKey: "lessonId",
            as: "parts",
          });
        },
      },
    }
  );

  return Lessons;
};

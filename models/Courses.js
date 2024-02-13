const models = require("../models");

module.exports = (sequelize, DataTypes) => {
  const Courses = sequelize.define("Courses", {
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "New Course",
    },
    authorId: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "0",
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "New Course",
    },
    dateOfCreation: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Courses.associate = (models) => {
    Courses.hasMany(models.Lessons, {
      onDelete: "cascade",
    });
  };

  return Courses;
};

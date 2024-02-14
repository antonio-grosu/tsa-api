const models = require("../models");

module.exports = (sequelize, DataTypes) => {
  const Courses = sequelize.define("Courses", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateOfCreation: {
      type: DataTypes.DATE,
      allowNull: false,
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

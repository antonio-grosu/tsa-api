const models = require("../models");

module.exports = (sequelize, DataTypes) => {
  const Lessons = sequelize.define("Lessons", {
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
  });

  Lessons.associate = (models) => {
    Lessons.hasMany(models.Exercise, {
      onDelete: "cascade",
    });
    Lessons.hasMany(models.Parts, {
      onDelete: "cascade",
    });
  };

  return Lessons;
};

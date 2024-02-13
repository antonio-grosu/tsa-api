const models = require("../models");

module.exports = (sequelize, DataTypes) => {
  const Courses = sequelize.define(
    "Courses",
    {
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
        allowNull: true,
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      classMethods: {
        associate: (models) => {
          Courses.belongsTo(models.CreatedBy, {
            foreignKey: {
              name: "createdBy",
              allowNull: false,
              type: DataTypes.UUID,
            },
          });
          Courses.hasMany(models.Lessons, {
            foreignKey: {
              name: "courseId",
              allowNull: false,
              type: DataTypes.UUID,
            },
          });
          Courses.hasMany(models.OwnedBy, {
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

  return Courses;
};

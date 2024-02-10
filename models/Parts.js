const models = require("../models");

module.exports = (sequelize, DataTypes) => {
  const Parts = sequelize.define(
    "Parts",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(2500),
        allowNull: false,
      },
      quiz: {
        type: DataTypes.STRING(2500),
        allowNull: true,
      },
      quizAnswer: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      quizAnswerIsCorrect: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      classMethods: {
        associate: (models) => {
          Parts.belongsTo(models.Lessons, {
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

  return Parts;
};

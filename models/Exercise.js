const models = require("../models");

module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define("Exercise", {
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer3: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer4: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correctAnswer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hint: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    explanation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Exercise;
};

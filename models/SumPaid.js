const { DataTypes } = require("sequelize");
const models = require("../models");

module.exports = (sequelize, DataTypes) => {
  const SumPaid = sequelize.define("SumPaid", {
    sum: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  SumPaid.associate = (models) => {
    SumPaid.belongsTo(models.User, {
      onDelete: "cascade",
    });
  };

  return SumPaid;
};

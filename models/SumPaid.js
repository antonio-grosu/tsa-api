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

  return SumPaid;
};

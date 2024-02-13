const models = require("../models");

module.exports = (sequelize, DataTypes) => {
  const Parts = sequelize.define(
    "Parts",
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING(2500),
        allowNull: false,
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

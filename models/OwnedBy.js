const models = require("../models");

module.exports = (sequelize, DataTypes) => {
  const OwnedBy = sequelize.define("OwnedBy", {
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  OwnedBy.associate = (models) => {
    OwnedBy.hasOne(models.Courses, {
      onDelete: "cascade",
    });
  };

  return OwnedBy;
};

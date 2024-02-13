module.exports = (sequelize, DataTypes) => {
  const OwnedBies = sequelize.define("OwnedBies", {
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  OwnedBies.associate = (models) => {
    OwnedBies.hasOne(models.Courses, {
      onDelete: "cascade",
    });
  };

  return OwnedBies;
};

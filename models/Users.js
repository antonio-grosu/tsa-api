module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    xp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateOfCreation: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dateOfLastLogin: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.OwnedBies, {
      onDelete: "cascade ",
    });
    Users.hasMany(models.SumPaid, {
      onDelete: "cascade",
    });
  };

  return Users;
};

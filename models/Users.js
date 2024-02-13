module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    xp: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateOfCreation: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    dateOfLastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.OwnedBy, {
      onDelete: "cascade ",
    });
  };

  return Users;
};

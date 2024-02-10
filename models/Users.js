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
    level: {
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
    }
  }, {
    classMethods: {
      associate: (models) => {
        Users.hasMany(models.Courses, {
          foreignKey: 'authorId',
          as: 'courses'
        });
        Users.hasMany(models.Lessons, {
          foreignKey: 'authorId',
          as: 'lessons'
        });
      }
    }
  }

  );

  return Users;
};

module.exports = (sequelize, DataTypes) => {
    const Courses = sequelize.define('Courses', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        dateOfCreation: {
            type: DataTypes.DATE,
            allowNull: true
        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        icon: {
            type: DataTypes.STRING,
            allowNull: true
        },
    }, {
        classMethods: {
            associate: (models) => {
                Courses.belongsTo(models.Users, {
                    foreignKey: 'authorId',
                    as: 'author'
                });
                Courses.hasMany(models.Lessons, {
                    foreignKey: 'courseId',
                    as: 'lessons'
                });
            }
        }
    }
    );

    return Courses;
}
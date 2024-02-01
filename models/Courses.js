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
    });

    return Courses;
}
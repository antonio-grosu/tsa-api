module.exports = (sequelize, DataTypes) => {
    const Lessons = sequelize.define('Lessons', {
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
        }
    });

    return Lessons;
}
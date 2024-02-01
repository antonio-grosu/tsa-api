module.exports = (sequelize, DataTypes) => {
    const Owns = sequelize.define('Owns', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    });

    return Owns;
}
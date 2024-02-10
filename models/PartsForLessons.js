module.exports = (sequelize, DataTypes) => {
    const PartsForLessons = sequelize.define('PartsForLessons', {
        lessonId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        partId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return PartsForLessons;
}
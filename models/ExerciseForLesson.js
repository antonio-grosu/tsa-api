module.exports = (sequelize, DataTypes) => {
    const ExerciseForLesson = sequelize.define('ExerciseForLesson', {
        lessonId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        exerciseId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return ExerciseForLesson;
}
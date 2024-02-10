module.exports = (sequelize, DataTypes) => {
    const LessonsForCourses = sequelize.define('LessonsForCourses', {
        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        lessonId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return LessonsForCourses;
}

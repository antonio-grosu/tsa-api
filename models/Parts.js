module.exports = (sequelize, DataTypes) => {
    const Parts = sequelize.define('Parts', {
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING(2500),
            allowNull: false
        },
        quiz: {
            type: DataTypes.STRING(2500),
            allowNull: true
        },
        quizAnswer: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        quizAnswerIsCorrect: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        lessonId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    });

    return Parts;
}
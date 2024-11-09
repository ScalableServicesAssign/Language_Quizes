const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    type: { type: String, required: true }, // 'text', 'multiple_choice', 'true_false'
    options: [String], // Only used for multiple-choice questions
    correctAnswer: { type: String, required: true }
});

const quizSchema = new mongoose.Schema({
    quizId: { type: String, unique: true, required: true },
    questions: [questionSchema]
});

module.exports = mongoose.model('Quiz', quizSchema);

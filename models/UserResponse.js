const mongoose = require('mongoose');

const userResponseSchema = new mongoose.Schema({
    quizId: { type: String, required: true },
    answers: [String], // Array of answers submitted by the user
    userId: { type: String, required: true }
});

module.exports = mongoose.model('UserResponse', userResponseSchema);

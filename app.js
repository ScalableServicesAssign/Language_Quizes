const express = require('express');
const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
const UserResponse = require('./models/UserResponse');

const app = express();
const PORT = 3000;

app.use(express.json());

// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/quizdb';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("MongoDB connection error:", err));

// Route to add a quiz with questions
app.post('/addQuiz', async (req, res) => {
    const { quizId, questions } = req.body;

    try {
        const quiz = new Quiz({ quizId, questions });
        await quiz.save();
        res.status(201).json({ message: 'Quiz added successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error adding quiz', error: err.message });
    }
});

// Route to get a quiz by ID
app.get('/quiz/:quizId', async (req, res) => {
    try {
        const quiz = await Quiz.findOne({ quizId: req.params.quizId });
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        res.status(200).json(quiz);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching quiz', error: err.message });
    }
});

// Route to submit answers for a quiz
app.post('/quiz/:quizId/submit', async (req, res) => {
    const { quizId } = req.params;
    const { answers, userId } = req.body;

    try {
        const userResponse = new UserResponse({ quizId, answers, userId });
        await userResponse.save();
        res.status(200).json({ message: 'Answers submitted successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error submitting answers', error: err.message });
    }
});

// Route to calculate score
app.get('/quiz/:quizId/score/:userId', async (req, res) => {
    const { quizId, userId } = req.params;

    try {
        const quiz = await Quiz.findOne({ quizId });
        const userResponse = await UserResponse.findOne({ quizId, userId });

        if (!quiz || !userResponse) {
            return res.status(404).json({ message: 'Quiz or answers not found' });
        }

        let score = 0;
        quiz.questions.forEach((question, index) => {
            const correctAnswer = question.correctAnswer;
            const userAnswer = userResponse.answers[index];

            if (userAnswer && userAnswer.toString().toLowerCase() === correctAnswer.toString().toLowerCase()) {
                score += 1;
            }
        });

        res.status(200).json({ score, total: quiz.questions.length });
    } catch (err) {
        res.status(500).json({ message: 'Error calculating score', error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

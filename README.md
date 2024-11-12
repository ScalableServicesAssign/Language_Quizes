I USE THE MONGODB DATABASE FOR THIS QUIZE SERVICE FOR LNAGUAGE LEARNING APPLICATION

Download the mongodb and create an dabatabas with name quizedb
""mongodb://localhost:27017/quizdb""

1. ADD QUIZ ACCORDING TO LANGUAGE I HAVE ADDED SPANISH AND FRENCH LANG QUIZES

POST http://localhost:3000/addQuiz

{
    "quizId": "spanish_basics",
    "questions": [
        { "question": "What is 'apple' in Spanish?", "type": "text", "correctAnswer": "manzana" },
        { "question": "How do you say 'thank you' in Spanish?", "type": "multiple_choice", "options": ["gracias", "hola", "adios", "por favor"], "correctAnswer": "gracias" }
    ]
}
****************************************************************************************************************************************************************************************************************************************************************************************************************************************
POST http://localhost:3000/addQui
{
    "quizId": "french_basics",
    "questions": [
        {
            "question": "What is the French word for 'apple'?",
            "type": "text",
            "correctAnswer": "pomme"
        },
        {
            "question": "How do you say 'good morning' in French?",
            "type": "text",
            "correctAnswer": "bonjour"
        },
        {
            "question": "Which of these means 'thank you' in French?",
            "type": "multiple_choice",
            "options": ["merci", "au revoir", "bonjour", "pomme"],
            "correctAnswer": "merci"
        },
        {
            "question": "True or False: 'Bonjour' means 'hello'.",
            "type": "true_false",
            "correctAnswer": "true"
        }
    ]
}

2. SUBMIT THE ANSWERS TO THE QUIZE WITH USER ID

POST http://localhost:3000/quiz/french_basics/submit


{
    "answers": ["pomme", "bonjour", "merci", "true"],
    "userId" : "user213"
}

****************************************************************************************************************************************************************************************************************************************************************************************************************************************
POST http://localhost:3000/quiz/spanish_basics/submit

{
    "answers": ["manzana", "gracias"],
    "userId": "user123"
}

3. CHECK THE QUIZE SCORE FOR EACH USERS

GET http://localhost:3000/quiz/spanish_basics/score/user123

GET http://localhost:3000/quiz/french_basics/score/user213

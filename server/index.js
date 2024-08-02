const express = require('express');
const cors = require('cors');

const app = express();


app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());

app.post('/bfhl', (req, res) => {
    console.log('Request Body:', req.body); 

    const { data } = req.body;

    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: 'Input must be an array.' });
    }

    const isAlphabet = char => typeof char === 'string' && /^[A-Za-z]$/.test(char);
    const isNumber = char => typeof char === 'string' && /^\d+$/.test(char);

    const alphabets = data.filter(isAlphabet);
    const numbers = data.filter(isNumber);
    const highestAlphabet = alphabets.length ? [alphabets.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })).pop()] : [];

    res.json({
        is_success: true,
        user_id: "Kishore Kumar S",
        email: "ks8138@srmist.edu.in",
        roll_number: "RA211003020384",
        numbers: numbers,
        alphabets: alphabets,
        highest_alphabet: highestAlphabet
    });
});

app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

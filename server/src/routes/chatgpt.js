const express = require('express');
const router = express.Router();
const openai = require('openai');

openai.apiKey = process.env.OPENAI_SECRET_KEY;

router.post('/', async (req, res) => {
    const inputMessage = req.body.message;
    try {
        const gptResponse = await openai.Completion.create({
            engine: "text-davinci-002",
            prompt: inputMessage,
            max_tokens: 60
        });

        const outputMessage = gptResponse.data.choices[0].text;
        res.json({ message: outputMessage });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred when trying to communicate with GPT-3" });
    }
});

module.exports = router;

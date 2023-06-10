const express = require('express');
const router = express.Router();
const openai = require('openai');

openai.apiKey = process.env.OPENAI_SECRET_KEY;

router.post('/hello', async (req, res) => {
    const inputMessage = req.body.message;
    try {
        const gptResponse = await openai.Completion.create({
            engine: "gpt-3.5-turbo",
            prompt: inputMessage,
            max_tokens: 100
        });

        const outputMessage = gptResponse.data.choices[0].text;
        res.json({ message: outputMessage });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred when trying to communicate with GPT-3" });
    }
});

module.exports = router;

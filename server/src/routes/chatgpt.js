const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post('/hello', async (req, res) => {
    const inputMessage = req.body.message;
    try {
        const gptResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            max_tokens: 100,
            messages: [
                {
                    role:"user",
                    content: inputMessage,
                }]
        });

        const outputMessage = gptResponse.data.choices[0].message;
        res.json({ message: outputMessage });
    } catch (err) {
        console.error(err);
        if (err.response) {
            console.log(err.response.status);
            console.log(err.response.data);
        } else {
            console.log(err.message);
        }
        res.status(500).json({ error: "An error occurred when trying to communicate with GPT-3" });
    }
});

router.get('/hello', (req, res) => {
    res.send('Hello World!');
});

module.exports = router;

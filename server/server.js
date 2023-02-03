import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import openai from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello world!',
    });
});

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const response = await openai.textCompletion({
            model: "text-davinci-002",
            prompt: `${prompt}`,
            maxTokens: 3000,
            temperature: 0,
        });

        res.status(200).send({
            bot: response.choices[0].text,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error });
    }
});

app.listen(5001, () => console.log('server is running on port http://localhost:5001'));
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Ruta para generar guión con OpenAI
app.post('/generate-script', async (req, res) => {
    const { topic, duration, style } = req.body;

    if (!topic || !duration || !style) {
        return res.status(400).json({ error: 'Faltan datos requeridos.' });
    }

    const prompt = `Escribe un guión para un video de ${duration} segundos sobre el tema: ${topic}. El estilo debe ser ${style}. Sé breve, llamativo, y adecuado para narración.`;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'Eres un generador profesional de guiones de video.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0.7
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        const script = response.data.choices[0].message.content;
        res.json({ script });

    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ error: 'Error al generar el guión con OpenAI.' });
    }
});

// Otras rutas pueden agregarse aquí para ElevenLabs, Stability AI y RunwayML

app.listen(PORT, () => {
    console.log(`✅ Servidor de backend activo en http://localhost:${PORT}`);
});

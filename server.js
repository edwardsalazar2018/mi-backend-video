const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.get('/', (req, res) => {
  res.json({ 
    mensaje: '¡Backend funcionando! 🚀',
    proyecto: 'Editor de Video con IA',
    fecha: new Date().toLocaleString()
  });
});

app.post('/generar-video', (req, res) => {
  res.json({
    exito: true,
    mensaje: '✅ Video generado con éxito!',
    id: Date.now(),
    url: 'https://ejemplo.com/video.mp4'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor funcionando en puerto ${PORT}`);
});

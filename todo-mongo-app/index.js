const express = require('express');
    const mongoose = require('mongoose'); // 1. Importamos mongoose
    const app = express();
    const PORT = 3000;

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // 2. Conexión a MongoDB (creará una base de datos llamada 'todoDB' automáticamente)
    mongoose.connect('mongodb://127.0.0.1:27017/todoDB')
    .then(() => console.log('¡Conectado exitosamente a MongoDB! 🍃'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

    app.get('/', (req, res) => {
        res.send('¡Servidor de Lista de Tareas funcionando!');
    });

    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
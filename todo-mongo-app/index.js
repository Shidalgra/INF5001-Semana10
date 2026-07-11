const express = require('express');
const mongoose = require('mongoose'); // 1. Importamos mongoose
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importamos el modelo de la Tarea
const Tarea = require('./models/Tarea');

// -----------------------------------------------
// Ruta para CREAR una nueva tarea (POST)
app.post('/tareas', async (req, res) => {
    try {
        const nuevaTarea = new Tarea({
            titulo: req.body.titulo
        });
        await nuevaTarea.save(); // Guarda el documento en MongoDB
        res.status(201).json(nuevaTarea);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la tarea', error });
    }
});
// -----------------------------------------------
// Ruta para LEER todas las tareas (GET)
app.get('/tareas', async (req, res) => {
    try {
        const listaTareas = await Tarea.find(); // Busca todos los documentos en la colección
        res.status(200).json(listaTareas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las tareas', error });
    }
});
// -----------------------------------------------
// Ruta para ACTUALIZAR una tarea por su ID (PUT)
app.put('/tareas/:id', async (req, res) => {
    try {
        const tareaActualizada = await Tarea.findByIdAndUpdate(
            req.params.id, 
            { titulo: req.body.titulo },
            { new: true } // Esto hace que devuelva la tarea ya modificada
        );
        res.status(200).json(tareaActualizada);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar la tarea', error });
    }
});
// -----------------------------------------------
// Ruta para ELIMINAR una tarea por su ID (DELETE)
app.delete('/tareas/:id', async (req, res) => {
    try {
        await Tarea.findByIdAndDelete(req.params.id);
        res.status(200).json({ mensaje: 'Tarea eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la tarea', error });
    }
});


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


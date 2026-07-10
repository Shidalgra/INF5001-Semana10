const mongoose = require('mongoose');

    // Este es el molde (Esquema) de tu tabla/colección
    const TareaSchema = new mongoose.Schema({
        titulo: {
            type: String,
            required: true // No puede estar vacío (como NOT NULL en SQL)
        },
        completada: {
            type: Boolean,
            default: false // Por defecto, la tarea no está hecha
        },
        fechaCreacion: {
            type: Date,
            default: Date.now // Guarda la fecha actual automáticamente
        }
    });

    // Exportamos el modelo para usarlo en el servidor
    module.exports = mongoose.model('Tarea', TareaSchema);
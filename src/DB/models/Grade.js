import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subject: {
        type: String,
        required: [true, 'La materia es requerida'],
        trim: true
    },
    grade: {
        type: Number,
        required: [true, 'La calificación es requerida'],
        min: 0,
        max: 100
    },
    semester: {
        type: String,
        required: [true, 'El cuatrimestre es requerido'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Evitar error de recompilación de modelos en desarrollo
if (mongoose.models.Grade) {
    delete mongoose.models.Grade;
}

export default mongoose.model('Grade', gradeSchema);

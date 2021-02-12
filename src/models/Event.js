const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: String,
    year: Number, 
    prazo_submissao: new Date(),
    inicio_apresentacao: new Date(),
    fim_apresentacao: new Date(),
    timestamps: { 
        createdAt: 'created_at' 
    }
});

module.exports = mongoose.model('Event', EventSchema);
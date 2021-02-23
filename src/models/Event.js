const mongoose = require('mongoose');

const schemaOptions = {
    timestamps: { createdAt: 'created_at' },
};

const EventSchema = new mongoose.Schema({
    name: String,
    year: Number,
    prazo_submissao: Date,
    inicio_apresentacao: Date,
    fim_apresentacao: Date
}, schemaOptions);

module.exports = mongoose.model('Event', EventSchema);
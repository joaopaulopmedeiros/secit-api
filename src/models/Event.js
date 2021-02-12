const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: String,
    year: Number, 
});

module.exports = mongoose.model('Event', EventSchema);
const mongoose = require('mongoose');

const schemaOptions = {
    timestamps: { createdAt: 'created_at'},
  };

const EventSchema = new mongoose.Schema({
    name: String,
    year: Number, 
    /*prazo_submissao: { type: Date, default: Date.now },
    inicio_apresentacao: { type: Date, default: Date.now },
    fim_apresentacao: { type: Date, default: Date.now },*/
    /*
    timestamps: { 
        createdAt: 'created_at'     
    }
    */
}, schemaOptions);


  

module.exports = mongoose.model('Event', EventSchema);
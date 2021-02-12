const axios = require('axios');
const Event = require('../models/Event');

module.exports =  {
    async index(request, response){
        const events = await Event.find();
        return response.json(events);
    },
    
}
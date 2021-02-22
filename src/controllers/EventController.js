const Event = require('../models/Event');

module.exports =  {
    async index(request, response){
        const events = await Event.find();
        return response.status(200).json(events);
    },

    async store(request, response){
        const { name, year } = request.body;
        
        let event = await Event.findOne({ name }); 

        if (!event) {
            event = await Event.create({
                name,
                year
            });            
        }

        return response.json(event);
    },

    async show(request, response){
        const { id } = request.params;
        
        let event = await Event.findOne({ _id: id }); 

        if (!event) {
            return response.status(404).json(event);           
        }

        return response.json(event);
    }
    
}
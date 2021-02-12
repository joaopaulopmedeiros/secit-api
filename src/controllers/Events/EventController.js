const Event = require('../../models/Event');

module.exports =  {
    async index(request, response){
        const events = await Event.find();
        return response.json(events);
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
    }
    
}
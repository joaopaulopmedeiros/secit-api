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

     async delete(request, response) {
       
        await Event.deleteOne({ _id: request.body.id }, function (err) {
          if(err)  return response.status(404).json({message: "Not Found"});
          else  return response.status(200).json({message: "success"});
        });
    }
    
    
}
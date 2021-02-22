const {
    HTTP_BAD_REQUEST_ERROR,
    HTTP_INTERNAL_SERVER_ERROR,
    HTTP_NOT_FOUND_ERROR
} = require('../utils/constants/http');

const Event = require('../models/Event');

module.exports = {
    async index(request, response) {
        const events = await Event.find();
        return response.status(200).json(events);
    },

    async store(request, response) {
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

    async show(request, response) {
        const { id } = request.params;

        let event = await Event.findOne({ _id: id });

        if (!event) {
            return response.status(404).json(event);
        }

        return response.json(event);
    },

    async update(request, response) {

        const { id } = request.params;

        const { name } = request.body;

        if (!name) return response.status(400).json({
            error: HTTP_BAD_REQUEST_ERROR
        })

        try {
            let event = await Event.findOne({ _id: id })
            await event.save();
            return response.json(event);
        } catch (e) {
            return response.status(404).json({
                error: HTTP_NOT_FOUND_ERROR
            })
        }
    },
    async delete(request, response) {
       
        await Event.deleteOne({ _id: request.body.id }, function (err) {
          if(err)  return response.status(404).json({message: "Not Found"});
          else  return response.status(200).json({message: "success"});
        });
    }

}
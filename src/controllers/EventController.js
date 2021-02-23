const {
    HTTP_SUCCESS,
    HTTP_BAD_REQUEST_ERROR,
    HTTP_INTERNAL_SERVER_ERROR,
    HTTP_NOT_FOUND_ERROR
} = require('../utils/constants/http');

const Event = require('../models/Event');

module.exports = {
    async index(request, response) {
        try {
            const events = await Event.find();
            return response.status(200).json(events);
        } catch {
            return response.status(500).json({
                message: HTTP_INTERNAL_SERVER_ERROR
            });
        }
    },

    async store(request, response) {
        const notValid = !request.body.name || !request.body.year;

        if (notValid) return response.status(400).json({
            error: HTTP_BAD_REQUEST_ERROR
        });

        const { name, year } = request.body;

        let event = await Event.findOne({ name });

        if (!event) {
            try {
                event = await Event.create({
                    name,
                    year
                });
            } catch {
                return response.status(500).json({
                    error: HTTP_INTERNAL_SERVER_ERROR
                });
            }

        }

        return response.status(201).json({
            message: HTTP_SUCCESS,
            event
        });
    },

    async show(request, response) {
        const { id } = request.params;

        let event = await Event.findOne({ _id: id }, function (err) {
            if (err) return response.status(404).json({
                error: HTTP_NOT_FOUND_ERROR
            });
        });

        return response.status(200).json({
            message: HTTP_SUCCESS,
            event
        });

    },

    async update(request, response) {

        const notValid = !request.body.name;

        if (notValid) return response.status(400).json({
            error: HTTP_BAD_REQUEST_ERROR
        });

        const { id } = request.params;
        const { name } = request.body;

        let event = await Event.findOne({ _id: id }, function (err) {
            if (err) return response.status(404).json({
                error: HTTP_NOT_FOUND_ERROR
            });
        });

        event.name = name;

        try {
            await event.save();
            return response.json(event);
        } catch {
            return response.status(500).json({
                message: HTTP_INTERNAL_SERVER_ERROR
            });
        }

    },
    async delete(request, response) {
        await Event.deleteOne({ _id: request.body.id }, function (err) {
            if (err) return response.status(404).json({ message: HTTP_NOT_FOUND_ERROR });
            else return response.status(200).json({ message: HTTP_SUCCESS });
        });
    }

}
const jwt = require('jsonwebtoken')
const UserModel = require('../models/User')
require('dotenv').config();


module.exports = {

    async index(req, res, next) {
        const [, token] = req.headers.authorization.split(' ')
        try {
            const payload = await jwt.verify(token, process.env.JWT_KEY)
            const user = await UserModel.findById(payload.user)
            if (!user) {
                return send(401)
            }
            req.auth = user
            next()
        } catch (error) {
            res.send(error)
        }
    }
}
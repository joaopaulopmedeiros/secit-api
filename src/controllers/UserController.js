const {
    HTTP_SUCCESS,
    HTTP_BAD_REQUEST_ERROR,
    HTTP_INTERNAL_SERVER_ERROR,
    HTTP_NOT_FOUND_ERROR
} = require('../utils/constants/http');

const User = require('../models/User');
const bcrypt = require('bcrypt');


module.exports = {


    async index(request, response) {
        try {
            //listar users sem a senha criptografada
            const users = await User.find({},'name email').exec();
            return response.status(200).json(users);
        } catch {
            return response.status(500).json({
                message: HTTP_INTERNAL_SERVER_ERROR
            });
        }
    },

    async store(request, response) {
        //validação para o cadastro
        const notValid = !request.body.name || !request.body.email || !request.body.password ;

        if (notValid) return response.status(400).json({
            error: HTTP_BAD_REQUEST_ERROR
        });
        

        let { 
            name,
            email,
            password,
        } = request.body;

        //definições da criptografia
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        let passwordenc = bcrypt.hashSync(password, saltRounds);
        
        //inserção da senha criptografada no json CREATE
        password = passwordenc;
        try {
            const user = await User.create({
                name,
                email,
                password
            });
            //oculta a senha criptografada
            user.password = undefined;
            return response.status(201).json({
                message: HTTP_SUCCESS,
                user
            });
        } catch(err) {
            return response.status(500).json({
                error: HTTP_INTERNAL_SERVER_ERROR,
                description: err
            });
        }
    },

    async login(request, response) {
        //validação para o login
        const notValid = !request.body.email || !request.body.password ;

        if (notValid) return response.status(400).json({
            error: HTTP_BAD_REQUEST_ERROR,
            message: "insira o email e a senha"
        });
        
        const { 
            email,
            password,
        } = request.body;

        try{        
            let user = await User.findOne({ email: email });
        
            const match = bcrypt.compareSync(password, user.password);
     
            if(match) return response.status(201).json({ message: HTTP_SUCCESS, user, password})
            else return response.status(500).json({ message: HTTP_INTERNAL_SERVER_ERROR, description: "senha incorreta" })
        
        }catch (err){
            response.status(500).json(
                { 
                    message: HTTP_INTERNAL_SERVER_ERROR, 
                })
        }

    },

    async delete(request, response) {
        //deleção do usuário pelo "id" passado pelo body da req        
        await User.deleteOne({ _id: request.body.id }, function (err) {
            if (err) return response.status(404).json({ message: HTTP_NOT_FOUND_ERROR });
            else return response.status(200).json({ message: HTTP_SUCCESS });
        });
    }


}

const jwt = require('jsonwebtoken');

const secret = 'euqueromeudiploma'

module.exports = {

    requering(payload){
        var self = this;
        let token = jwt.sign( payload, self.secret, {expiresIn: 86400})
        return token;
    },
    check(token){
        var self = this;
        return jwt.verify(token, self.secret)
    }
    
   

}
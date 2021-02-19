require('dotenv').config();
const mongoose = require('mongoose');

const initializeDatabase = async () => {
    await mongoose.connect(`${process.env.MONGO_DB_CONNECTION}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

module.exports = initializeDatabase;
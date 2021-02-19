const mongoose = require('mongoose');

const closeDatabase = async () => {
    await mongoose.connection.close();
}

module.exports = closeDatabase;
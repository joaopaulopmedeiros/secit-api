const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
  
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },
  
      password: {
        type: String,
        required: true,
      //select: false,
      },
    },
    {
      timestamps: true,
      toJSON: { virtuals: true, getters: true },
      toObject: { virtuals: true, getters: true },
    },

  );
  

  module.exports = mongoose.model('User', userSchema);
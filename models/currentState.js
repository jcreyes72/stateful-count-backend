const mongoose = require('mongoose');

// Schema
const Schema = mongoose.Schema;
const lastNumber = new Schema({
    state: 0,
});

// Model 
const currentState = mongoose.model('currentState', lastNumber);

module.exports = currentState;
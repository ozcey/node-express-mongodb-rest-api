const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Required'],
        minLength: [2, 'Must be at least 2 characters long, got {VALUE}']
    },
    email: {
        type: String,
        required: [true, 'Required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Required'],
        minLength: [8, 'Must be at least 8 characters long, got {VALUE}']
    },
    roles: {
        type: Array,
        required: [true, 'Required']
    }
});


userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
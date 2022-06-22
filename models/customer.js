const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Required'],
        minLength: [2, 'Must be at least 2 characters long, got {VALUE}']
    },
    phone: {
        type: String,
        validate: {
            validator: (value) => {
                return /\d{3}-\d{3}-\d{4}/.test(value);
            },
            message: props => `${props.value} is not a valid phone number`
        },
        required: [true, 'Required']

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
    },
    address: {
        street: {
            type: String,
            required: [true, 'Required']
        },
        city: {
            type: String,
            required: [true, 'Required']
        },
        state: {
            type: String,
            required: [true, 'Required']
        },
        zipcode: {
            type: String,
            required: [true, 'Required']
        }
    }
});


customerSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Customer', customerSchema);
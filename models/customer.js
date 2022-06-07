const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const addressSchema = mongoose.Schema({
    street: {
        String

    },
    city: {
        String

    },
    state: {
        String

    },
    zipcode: {
        String

    },
});

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
    address: {
        street: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        zipcode: {
            type: String
        }
    }
});


customerSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Customer', customerSchema);
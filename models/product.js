const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Required']
    },
    price: {
        type: Number,
        required: [true, 'Required']

    },
    description: {
        type: String,
        required: [true, 'Required'],
    },
    demographic: {
        type: String,
        required: [true, 'Required']
    },
    category: {
        type: Number,
        required: [true, 'Required']

    },
    type: {
        type: String,
        required: [true, 'Required'],
    },
    quantity: {
        type: String,
        required: [true, 'Required']
    },
    imageURL: {
        type: String,
        required: [true, 'Required']
    },
      customerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Customer',
          required: [true, 'Required']
      }
});


module.exports = mongoose.model('Product', productSchema);
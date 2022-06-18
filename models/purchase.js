const mongoose = require('mongoose');

const purchaseSchema = mongoose.Schema({
    date: {
        type: String,
        required: [true, 'Required']
    },
    total: {
        type: Number,
        required: [true, 'Required']

    },
    discountCode: {
        type: String
    },
    items: {
        type: Array,
        default: [],
        required: [true, 'Required']
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, 'Required']
    }
});


module.exports = mongoose.model('Purchase', purchaseSchema);
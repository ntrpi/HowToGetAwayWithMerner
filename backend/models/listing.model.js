const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

let Listing = new Schema( {
    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    price: {
        type: Number,
        // TODO: format as currency
        default: 0
    },

    user_email: {
        type: String,
        required: true
    },

    category_id: {
        type: String
    },

    is_flagged: {
        type: Boolean,
        default: false
    }

} );

module.exports = mongoose.model( 'Listing', Listing );
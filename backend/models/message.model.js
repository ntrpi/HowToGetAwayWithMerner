const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

let Message = new Schema( {
    listing_id: {
        type: String
    },
    user_id: {
        type: String
    },
    created: {
        type: Date
    },
    content: {
        type: String
    },
    is_sent: {
        type: Boolean,
        default: false
    },
} );

module.exports = mongoose.model( 'Message', Message );
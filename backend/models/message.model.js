const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

let Message = new Schema( {
    listing_id: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    subject: {
        type: String
    },
    message: {
        type: String
    },
} );

module.exports = mongoose.model( 'Message', Message );
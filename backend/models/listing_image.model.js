const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

let ListingImage = new Schema( {
    listing_id: {
        type: String
    },
    image_id: {
        type: String
    }
} );

module.exports = mongoose.model( 'ListingImage', ListingImage );
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

let Image = new Schema( {
    image_name: {
        type: String
    },
} );

module.exports = mongoose.model( 'Image', Image );        
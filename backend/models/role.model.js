const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

let Role = new Schema( {
    role_name: {
        type: String
    }
} );

module.exports = mongoose.model( 'Role', Role );        
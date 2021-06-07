const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

let UserRole = new Schema( {
    user_id: {
        type: String
    },
    role_id: {
        type: String
    }
} );

module.exports = mongoose.model( 'UserRole', UserRole );
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const bcrypt = require( 'bcryptjs' );

let User = new Schema( {

    user_password: {
        type: String,
        required: [true, "Password required"]
        // TODO: password criteria?
    },

    // https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
    // 2021/06/02
    user_email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email "
        },
        required: [true, "Email required"]
    },

    user_postal_code: {
        type: String,
        trim: true,
        validate: {
            validator: function( postalCode ) {
                return /^[a-zA-Z]\d[a-zA-Z][ -]?\d[a-zA-Z]\d$/i.test( postalCode );
            },
            message: "Please enter a valid Canadian postal code."
        },
        required: [true, "Postal code required"]
    },

    user_status: {
        type: String,
        enum: [ 'ACTIVE', 'FLAGGED', 'SUSPENDED', 'CANCELED'],
        default: 'ACTIVE'
    }
} );

// https://coderrocketfuel.com/article/store-passwords-in-mongodb-with-node-js-mongoose-and-bcrypt
// 2021/06/06
User.pre( "save", function( next )
{
    const user = this;

    if( this.isModified( "user_password" ) || this.isNew ) {
        const saltRounds = 10;
        bcrypt.genSalt( 10, function( saltError, salt )
        {
            if( saltError ) {
                console.log( "bcrypt salt error" );
                console.log( saltError );
                return next( saltError );

            } else {
                bcrypt.hash( user.user_password, salt, function( hashError, hash )
                {
                    if( hashError ) {
                        console.log( "bcrypt hash error" );
                        console.log( hashError );
                        return next( hashError );
                    }

                    user.password = hash;
                    next();
                } );
            }
        } );
    } else {
        return next();
    }
} );

User.methods.comparePassword = function( password, callback )
{
    bcrypt.compare( password, this.password, function( error, isMatch )
    {
        if( error ) {
            return callback( error );
        } else {
            callback( null, isMatch );
        }
    } );
}

module.exports = mongoose.model( 'User', User );
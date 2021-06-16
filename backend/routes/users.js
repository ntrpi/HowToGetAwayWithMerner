const helper = require( './routeHelper' );
var router = require( 'express' ).Router();

// Access the mongoose schemas.
let User = require( '../models/user.model' );

// Users index page.
router.route( '/' ).get( function( req, res )
{
    helper.log( "Users index page." );
    User.find( function( err, users )
    {
        if( err ) {
            const message = "An error occurred trying to get users.";
            helper.res404( res, message, err );
        } else {
            res.json( users );
        }
    } );
} );

// Endpoint to find by ID.
router.route( '/:id' ).get( function( req, res )
{
    let id = req.params.id;
    User.findById( id, function( err, user )
    {
        if( err ) {
            const message = "An error occurred trying to find user with id " + id;
            helper.res404( res, message, err );
        } else if( !user ) {
            helper.log( `User with id ${id} not found.` )
        } else {
            res.json( user );
        }
    } );
} );

// Endpoint to find by email.
router.route( '/email/:email' ).get( function( req, res ) 
{
    let userEmail = req.params.email;
    User.findOne( { user_email: userEmail }, function( err, user )
    {
        if( err ) {
            const message = "An error occurred trying to find user with email " + userEmail;
            helper.res404( res, message, err );
        } else if( !user ) {
            helper.log( `User with email ${user_email} not found.` )
        } else {
            res.json( user );
        }
    } );
} );

// Endpoint to update by ID.
router.route( '/update/:id' ).post( function( req, res )
{
    User.findById( req.params.id, function( err, user )
    {
        if( err ) {
            const message = "An error occurred trying to find user with id " + id;
            helper.res404( res, message, err );
        } else if( !user ) {
            helper.log( `User with id ${id} not found.` )
        } else {
            user.user_password = req.body.user_password;
            user.user_email = req.body.user_email;
            user.user_postal_code = req.body.user_postal_code;
            user.user_status = req.body.user_status;

            user.save().then( user =>
            {
                res.json( 'User updated!' );
            } )
            .catch( err =>
            {
                const message = "An error occurred trying to update user with id " + id;
                helper.res404( res, message, err );
            } );
        }
    } );
} );

// Endpoint to create a new record.
router.route( '/add' ).post( function( req, res )
{
    let user = new User( req.body );
    const email = user.user_email;
    user.save()
        .then( user =>
        {
            res.status( 200 ).json( { 'user': user } );
        } )
        .catch( err =>
        {
            helper.res404( res, `Failed to add ${email}.`, err );
        } );
} );

// Endpoint to delete a record.
router.route( '/delete/:id' ).post( function( req, res )
{
    let id = req.params.id;
    User.findByIdAndDelete( id, function( err, user )
    {
        if( !user ) {
            const message = "An error occurred trying to delete user with id " + id;
            helper.res404( res, message, err );

        } else {
            const message = `User ${id} deleted successfully.`;
            helper.res200( res, message );
        }
    } );
} );

// Endpoint to confirm a delete.
router.route( '/confirm-delete/:id' ).get( function( req, res )
{
    let id = req.params.id;
    User.findById( id, function( err, user )
    {
        helper.log( "in confirm delete" );
        if( err ) {
            const message = "An error occurred trying to find user to confirm delete with id " + id;
            helper.res404( res, message, err );

        } else if( !user ) {
            helper.log( `User for confirm delete with id ${id} not found.` )

        } else {
            res.json( user );
        }
    } );
} );


// Endpoint to log in a user.
router.route( '/login' ).post( function( req, res )
{
    const email = req.body.user_email;
    const password = req.body.user_password;
    const query = User.where( { user_email: email } );
    query.findOne( function ( err, user ) {
        if( err ) {
            console.log( err );
        } else if( !user ) {
            console.log( `User with email ${email} not found.` )
        } else {
            //https://coderrocketfuel.com/article/store-passwords-in-mongodb-with-node-js-mongoose-and-bcrypt
            // 2021/06/06
            user.comparePassword( password, function( matchError, isMatch ){
                if( matchError ) {
                    res.send( "A log in error occurred." );
                    console.log( matchError );
                } else if( !isMatch ) {
                    res.send( "Password is not a match." );
                } else {
                    res.status( 200 ).json( { 'user': `${email} successfully logged in.`});
                }
            } );
            res.json( user );
        }
    } );
} );

module.exports = router;
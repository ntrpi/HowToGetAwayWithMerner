const helper = require( './routeHelper' );
var router = require( 'express' ).Router();

// Access the mongoose schemas.
let Listing = require( '../models/listing.model' );
let User = require( '../models/user.model' );

// Listings index page.
router.route( '/' ).get( function( req, res )
{
    helper.log( "Listings index page." );
    Listing.find( function( err, listings )
    {
        if( err ) {
            const message = "An error occurred trying to get listings.";
            helper.res404( res, message, err );
        } else {
            res.json( listings );
        }
    } );
} );

// Endpoint to find by ID.
router.route( '/:id' ).get( function( req, res )
{
    let id = req.params.id;
    Listing.findById( id, function( err, listing )
    {
        if( err ) {
            const message = "An error occurred trying to find listing with id " + id;
            helper.res404( res, message, err );
        } else if( !listing ) {
            helper.log( `Listing with id ${id} not found.` )
        } else {
            res.json( listing );
        }
    } );
} );

// Endpoint to find listings for user by user ID.
router.route( '/user/:id' ).get( function( req, res )
{
    let userId = req.params.id;
    Listing.find( { user_id: userId }, function( err, listings ) 
    {
        if( err ) {
            const message = "An error occurred trying to find listings for user with id " + userId;
            helper.res404( res, message, err );
        } else if( !listings ) {
            helper.log( `Listings for user with id ${userId} not found.` )
        } else {
            res.json( listings );
        }
    } );
} );

// Endpoint to update by ID.
router.route( '/update/:id' ).post( function( req, res )
{
    Listing.findById( req.params.id, function( err, listing )
    {
        if( err ) {
            const message = "An error occurred trying to find listing with id " + id;
            helper.res404( res, message, err );
        } else if( !listing ) {
            helper.log( `Listing with id ${id} not found.` )
        } else {
            listing.title = req.body.title;
            listing.description = req.body.description;
            listing.price = req.body.price;
            listing.user_id = req.body.user_id;
            listing.category_id = req.body.category_id;
            listing.is_flagged = req.body.is_flagged;

            listing.save().then( listing =>
            {
                res.json( 'Listing updated!' );
            } )
            .catch( err =>
            {
                const message = "An error occurred trying to update listing with id " + id;
                helper.res404( res, message, err );
            } );
        }
    } );
} );

// Endpoint to create a new record.
router.route( '/add' ).post( function( req, res )
{
    let listing = new Listing( req.body );
    const email = listing.listing_email;
    User.findOne( { user_email: email }, function( err, user )
    {
        if( err ) {
            const message = "An error occurred trying to find user with email " + userEmail;
            helper.res404( res, message, err );
        } else if( !user ) {
            helper.log( `User with email ${user_email} not found.` )
        } else {
            const userId = user._id;

            listing.save()
            .then( listing =>
            {
                res.status( 200 ).json( { 'listing': listing } );
            } )
            .catch( err =>
            {
                helper.res404( res, `Failed to add listing "${listing.title}".`, err );
            } );
        }
    } );
} );

// Endpoint to delete a record.
router.route( '/delete/:id' ).post( function( req, res )
{
    let id = req.params.id;
    Listing.findByIdAndDelete( id, function( err, listing )
    {
        if( !listing ) {
            const message = "An error occurred trying to delete listing with id " + id;
            helper.res404( res, message, err );

        } else {
            const message = `Listing ${id} deleted successfully.`;
            helper.res200( res, message );
        }
    } );
    // Note removed r from message
} );

// Endpoint to confirm a delete.
router.route( '/confirm-delete/:id' ).get( function( req, res )
{
    let id = req.params.id;
    Listing.findById( id, function( err, listing )
    {
        helper.log( "in confirm delete" );
        if( err ) {
            const message = "An error occurred trying to find listing to confirm delete with id " + id;
            helper.res404( res, message, err );

        } else if( !listing ) {
            helper.log( `Listing for confirm delete with id ${id} not found.` )

        } else {
            res.json( listing );
        }
    } );
} );


// Endpoint to log in a listing.
router.route( '/login' ).post( function( req, res )
{
    const email = req.body.listing_email;
    const password = req.body.listing_password;
    const query = Listing.where( { listing_email: email } );
    query.findOne( function ( err, listing ) {
        if( err ) {
            console.log( err );
        } else if( !listing ) {
            console.log( `Listing with email ${email} not found.` )
        } else {
            //https://coderrocketfuel.com/article/store-passwords-in-mongodb-with-node-js-mongoose-and-bcrypt
            // 2021/06/06
            listing.comparePassword( password, function( matchError, isMatch ){
                if( matchError ) {
                    res.send( "A log in error occurred." );
                    console.log( matchError );
                } else if( !isMatch ) {
                    res.send( "Password is not a match." );
                } else {
                    res.status( 200 ).json( { 'listing': `${email} successfully logged in.`});
                }
            } );
            res.json( listing );
        }
    } );
} );

module.exports = router;
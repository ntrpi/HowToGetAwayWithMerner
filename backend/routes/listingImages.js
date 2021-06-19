const helper = require( './routeHelper' );
var router = require( 'express' ).Router();

// Access the mongoose schemas.
let ListingImage = require( '../models/listing_image.model' );

// ListingImages index page.
router.route( '/' ).get( function( req, res )
{
    helper.log( "ListingImages index page." );
    ListingImage.find( function( err, listingImages )
    {
        if( err ) {
            const message = "An error occurred trying to get listingImages.";
            helper.res404( res, message, err );
        } else {
            res.json( listingImages );
        }
    } );
} );

// Endpoint to find by ID.
router.route( '/:id' ).get( function( req, res )
{
    let id = req.params.id;
    ListingImage.findById( id, function( err, listingImage )
    {
        if( err ) {
            const message = "An error occurred trying to find listingImage with id " + id;
            helper.res404( res, message, err );
        } else if( !listingImage ) {
            helper.log( `ListingImage with id ${id} not found.` )
        } else {
            res.json( listingImage );
        }
    } );
} );

// Endpoint to find listingImages for listing by listing ID.
router.route( '/listing/:id' ).get( function( req, res )
{
    let listingId = req.params.id;
    ListingImage.find( { listing_id: listingId }, function( err, listingImages ) 
    {
        if( err ) {
            const message = "An error occurred trying to find listingImages for listing with id " + listingId;
            helper.res404( res, message, err );
        } else if( !listingImages ) {
            helper.log( `ListingImages for listing with id ${listingId} not found.` )
        } else {
            res.json( listingImages );
        }
    } );
} );

// Endpoint to find listingImages for image by image ID.
router.route( '/image/:id' ).get( function( req, res )
{
    let imageId = req.params.id;
    ListingImage.find( { image_id: imageId }, function( err, listingImages ) 
    {
        if( err ) {
            const message = "An error occurred trying to find listingImages for image with id " + imageId;
            helper.res404( res, message, err );
        } else if( !listingImages ) {
            helper.log( `ListingImages for image with id ${imageId} not found.` )
        } else {
            res.json( listingImages );
        }
    } );
} );

// Endpoint to create a new record.
router.route( '/add' ).post( function( req, res )
{
    let listingImage = new ListingImage( req.body );
    listingImage.save()
        .then( listingImage =>
        {
            res.status( 200 ).json( { 'listingImage': listingImage } );
        } )
        .catch( err =>
        {
            helper.res404( res, `Failed to add new listing image.`, err );
        } );
} );

// Endpoint to delete a record.
router.route( '/delete/:id' ).post( function( req, res )
{
    let id = req.params.id;
    ListingImage.findByIdAndDelete( id, function( err, listingImage )
    {
        if( !listingImage ) {
            const message = "An error occurred trying to delete listingImage with id " + id;
            helper.res404( res, message, err );

        } else {
            const message = `Listing Image ${id} deleted successfully.`;
            helper.res200( res, message );
        }
    } );
} );

// Endpoint to confirm a delete.
router.route( '/confirm-delete/:id' ).get( function( req, res )
{
    let id = req.params.id;
    ListingImage.findById( id, function( err, listingImage )
    {
        helper.log( "in confirm delete" );
        if( err ) {
            const message = "An error occurred trying to find listingImage to confirm delete with id " + id;
            helper.res404( res, message, err );

        } else if( !listingImage ) {
            helper.log( `ListingImage for confirm delete with id ${id} not found.` )

        } else {
            helper.log( listingImage );
            res.json( listingImage );
        }
    } );
} );

module.exports = router;
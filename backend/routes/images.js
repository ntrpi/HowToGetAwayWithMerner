const helper = require( './routeHelper' );
const router = require( 'express' ).Router();
const multer = require( 'multer' );
const { v4: uuidv4 } = require( 'uuid' );
let path = require( 'path' );

// Access the mongoose schemas.
let Image = require( '../models/image.model' );

// Set the path for storing the image.
const storage = multer.diskStorage( 
    {
        destination: function( req, file, callback ) { callback( null, '../public/img' ) },
        filename: function( req, file, callback ) {
            callback( null, uuidv4() + '-' + Date.now() + path.extname( file.originalname ) );
        }
    } 
);

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// Images index page.
router.route( '/' ).get( function( req, res )
{
    helper.log( "Images index page." );
    Image.find( function( err, images )
    {
        if( err ) {
            const message = "An error occurred trying to get images.";
            helper.res404( res, message, err );
        } else {
            res.json( images );
        }
    } );
} );

// Endpoint to find by ID.
router.route( '/:id' ).get( function( req, res )
{
    let id = req.params.id;
    Image.findById( id, function( err, image )
    {
        if( err ) {
            const message = "An error occurred trying to find image with id " + id;
            helper.res404( res, message, err );
        } else if( !image ) {
            helper.log( `Image with id ${id} not found.` )
        } else {
            res.json( image );
        }
    } );
} );

// Endpoint to create a new record.
let upload = multer( { storage, fileFilter } );
router.route( '/add' ).post( upload.single( 'image' ), function( req, res )
{
    const image_name = req.file.filename;
    const newImageData = {
        image_name
    };
    const image = new Image( newImageData );
    image.save()
        .then( image =>
        {
            res.status( 200 ).json( { 'image': image } );
        } )
        .catch( err =>
        {
            helper.res404( res, `Failed to add ${image}.`, err );
        } );
} );



// Endpoint to delete a record.
router.route( '/delete/:id' ).post( function( req, res )
{
    helper.log( "here" );
    let id = req.params.id;
    Image.findByIdAndDelete( id, function( err, image )
    {
        if( !image ) {
            const message = "An error occurred trying to delete image with id " + id;
            helper.res404( res, message, err );

        } else {
            const message = `Image ${id} deleted successfully.`;
            helper.res200( res, message );
        }
    } );
} );

// Endpoint to confirm a delete.
router.route( '/confirm-delete/:id' ).get( function( req, res )
{
    let id = req.params.id;
    Image.findById( id, function( err, image )
    {
        helper.log( "in confirm delete" );
        if( err ) {
            const message = "An error occurred trying to find image to confirm delete with id " + id;
            helper.res404( res, message, err );

        } else if( !image ) {
            helper.log( `Image for confirm delete with id ${id} not found.` )

        } else {
            res.json( image );
        }
    } );
} );


module.exports = router;
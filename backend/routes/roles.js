const helper = require( './routeHelper' );
var router = require( 'express' ).Router();

// Access the mongoose schemas.
let Role = require( '../models/role.model' );

// Roles index page.
router.route( '/' ).get( function( req, res )
{
    helper.log( "Roles index page." );
    Role.find( function( err, roles )
    {
        if( err ) {
            const message = "An error occurred trying to get roles.";
            helper.res404( res, message, err );
        } else {
            res.json( roles );
        }
    } );
} );

// Endpoint to find by ID.
router.route( '/:id' ).get( function( req, res )
{
    let id = req.params.id;
    Role.findById( id, function( err, role )
    {
        if( err ) {
            const message = "An error occurred trying to find role with id " + id;
            helper.res404( res, message, err );
        } else if( !role ) {
            helper.log( `Role with id ${id} not found.` )
        } else {
            res.json( role );
        }
    } );
} );

// Endpoint to find by name.
router.route( '/name/:name' ).get( function( req, res ) 
{
    let roleName = req.params.name;
    Role.findOne( { name: roleName }, function( err, role )
    {
        if( err ) {
            const message = "An error occurred trying to find role with name " + roleName;
            helper.res404( res, message, err );
        } else if( !role ) {
            helper.log( `Role with name ${roleName} not found.` )
        } else {
            res.json( role );
        }
    } );
} );

// Endpoint to create a new record.
router.route( '/add' ).post( function( req, res )
{
    let role = new Role( req.body );
    const name = role.role_name;
    role.save()
        .then( role =>
        {
            res.status( 200 ).json( { 'role': role } );
        } )
        .catch( err =>
        {
            helper.res404( res, `Failed to add ${name}.`, err );
        } );
} );



// Endpoint to delete a record.
router.route( '/delete/:id' ).post( function( req, res )
{
    helper.log( "here" );
    let id = req.params.id;
    Role.findByIdAndDelete( id, function( err, role )
    {
        if( !role ) {
            const message = "An error occurred trying to delete role with id " + id;
            helper.res404( res, message, err );

        } else {
            const message = `Role ${id} deleted successfully.`;
            helper.res200( res, message );
        }
    } );
} );

// Endpoint to confirm a delete.
router.route( '/confirm-delete/:id' ).get( function( req, res )
{
    let id = req.params.id;
    Role.findById( id, function( err, role )
    {
        helper.log( "in confirm delete" );
        if( err ) {
            const message = "An error occurred trying to find role to confirm delete with id " + id;
            helper.res404( res, message, err );

        } else if( !role ) {
            helper.log( `Role for confirm delete with id ${id} not found.` )

        } else {
            res.json( role );
        }
    } );
} );


module.exports = router;
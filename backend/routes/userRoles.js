const helper = require( './routeHelper' );
var router = require( 'express' ).Router();

// Access the mongoose schemas.
let UserRole = require( '../models/user_role.model' );

// UserRoles index page.
router.route( '/' ).get( function( req, res )
{
    helper.log( "UserRoles index page." );
    UserRole.find( function( err, userRoles )
    {
        if( err ) {
            const message = "An error occurred trying to get userRoles.";
            helper.res404( res, message, err );
        } else {
            res.json( userRoles );
        }
    } );
} );

// Endpoint to find by ID.
router.route( '/:id' ).get( function( req, res )
{
    let id = req.params.id;
    UserRole.findById( id, function( err, userRole )
    {
        if( err ) {
            const message = "An error occurred trying to find userRole with id " + id;
            helper.res404( res, message, err );
        } else if( !userRole ) {
            helper.log( `UserRole with id ${id} not found.` )
        } else {
            res.json( userRole );
        }
    } );
} );

// Endpoint to find userRoles for user by user ID.
router.route( '/user/:id' ).get( function( req, res )
{
    let userId = req.params.id;
    UserRole.find( { user_id: userId }, function( err, userRoles ) 
    {
        if( err ) {
            const message = "An error occurred trying to find userRoles for user with id " + userId;
            helper.res404( res, message, err );
        } else if( !userRoles ) {
            helper.log( `UserRoles for user with id ${userId} not found.` )
        } else {
            res.json( userRoles );
        }
    } );
} );

// Endpoint to find userRoles for role by role ID.
router.route( '/role/:id' ).get( function( req, res )
{
    let roleId = req.params.id;
    UserRole.find( { role_id: roleId }, function( err, userRoles ) 
    {
        if( err ) {
            const message = "An error occurred trying to find userRoles for role with id " + roleId;
            helper.res404( res, message, err );
        } else if( !userRoles ) {
            helper.log( `UserRoles for role with id ${roleId} not found.` )
        } else {
            res.json( userRoles );
        }
    } );
} );

// Endpoint to create a new record.
router.route( '/add' ).post( function( req, res )
{
    let userRole = new UserRole( req.body );
    userRole.save()
        .then( userRole =>
        {
            res.status( 200 ).json( { 'userRole': userRole } );
        } )
        .catch( err =>
        {
            helper.res404( res, `Failed to add new user role.`, err );
        } );
} );

// Endpoint to delete a record.
router.route( '/delete/:id' ).post( function( req, res )
{
    let id = req.params.id;
    UserRole.findByIdAndDelete( id, function( err, userRole )
    {
        if( !userRole ) {
            const message = "An error occurred trying to delete userRole with id " + id;
            helper.res404( res, message, err );

        } else {
            const message = `User Role ${id} deleted successfully.`;
            helper.res200( res, message );
        }
    } );
} );

// Endpoint to confirm a delete.
router.route( '/confirm-delete/:id' ).get( function( req, res )
{
    let id = req.params.id;
    UserRole.findById( id, function( err, userRole )
    {
        helper.log( "in confirm delete" );
        if( err ) {
            const message = "An error occurred trying to find userRole to confirm delete with id " + id;
            helper.res404( res, message, err );

        } else if( !userRole ) {
            helper.log( `UserRole for confirm delete with id ${id} not found.` )

        } else {
            helper.log( userRole );
            res.json( userRole );
        }
    } );
} );

module.exports = router;
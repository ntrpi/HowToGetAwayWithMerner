var router = require( 'express' ).Router();

router.get( 'http://localhost:4000/', function( req, res )
{
    res.send( 'Index Page' );
} );

router.get( 'http://localhost:4000/about', function( req, res )
{
    res.send( 'About Page' );
} );

module.exports = router;
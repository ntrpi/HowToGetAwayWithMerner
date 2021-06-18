// npm install dotenv --save
// echo "   YOUR DATABASE URL   " > .env
// Assuming this creates an object called process that has
// whatever vars are in your .env file as properties.
require( 'dotenv' ).config();
const url = process.env.ATLAS_URL;

//-----------------------------------------------------------------
// https://codingthesmartway.com/the-mern-stack-tutorial-building-a-react-crud-application-from-start-to-finish-part-2/
// Tutorial code

// Create an Express server to run on port 4000.
const express = require( 'express' );
const app = express();
const PORT = 4000;

// Attach the middleware
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
app.use( cors() );
app.use( bodyParser.json() );

// Use Mongoose to connect to the database.
const mongoose = require( 'mongoose' );
mongoose.connect( url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
} );
const connection = mongoose.connection;
connection.once( 'open', function()
{
    var today = new Date();
    var date = today.getFullYear() + '-' + ( today.getMonth() + 1 ) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    console.log( dateTime );
    console.log( "MongoDB database connection established successfully" );
} );


// https://riptutorial.com/express/example/16315/multiple-routes
// Routing
// app.use( '/', './routes/index.js' );
// app.use( '/listings', './routes/listings.js' );
// app.use( '/messages', './routes/messages.js' );

const userRouter = require( './routes/users' );
app.use( '/users', userRouter );

const roleRouter = require( './routes/roles' );
app.use( '/roles', roleRouter );

const userRoleRouter = require( './routes/userRoles' );
app.use( '/userRoles', userRoleRouter );

const listingRouter = require( './routes/listings' );
app.use( '/listings', listingRouter );

const imageRouter = require( './routes/images' );
app.use( '/images', imageRouter );


app.listen( PORT, function()
{
    console.log( "Server is running on Port: " + PORT );
} );
// npm install dotenv --save
// echo "   YOUR DATABASE URL   " > .env
// Assuming this creates an object called process that has
// whatever vars are in your .env file as properties.
require( 'dotenv' ).config();
const url = process.env.ATLAS_URL;

// Connecting with the mongo client.
const { MongoClient } = require( "mongodb" );
const client = new MongoClient( url, { useNewUrlParser: true, useUnifiedTopology: true } );

// The database to use
const dbName = "test";

async function run()
{
    try {
        await client.connect();
        console.log( "Connected correctly to server" );
        const db = client.db( dbName );

        // Use the collection "people"
        const col = db.collection( "people" );

        // Construct a document                  
        let personDocument = {
            "name": { "first": "Alan", "last": "Turing" },
            "birth": new Date( 1912, 5, 23 ), // June 23, 1912                                                                                                                                 
            "death": new Date( 1954, 5, 7 ),  // June 7, 1954                                                                                                                                  
            "contribs": [ "Turing machine", "Turing test", "Turingery" ],
            "views": 1250000
        };

        //// Insert a single document, wait for promise so we can read it back
        // const p = await col.insertOne( personDocument );
        //// Find one document
        // const myDoc = await col.find();
        //// Print to the console
        // console.log( myDoc );

        // var query = { views: 1250000 };
        // const items = await col.find( query ).toArray();
        // console.log( items );


    } catch( err ) {
        console.log( err.stack );
    }

    finally {
        await client.close();
    }
}

// Commented out so I don't keep inserting a doc into the db every time.
//run().catch( console.dir );

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
mongoose.connect( url, { useNewUrlParser: true, useUnifiedTopology: true } );
const connection = mongoose.connection;
connection.once( 'open', function()
{
    console.log( "MongoDB database connection established successfully" );
} );


// Create an instance of the Express Router.
const todoRoutes = express.Router();

// Access the mongoose schema.
let Todo = require( './todo.model' );

// This is the default endpoint, ~= index.html.
todoRoutes.route( '/' ).get( function( req, res )
{
    Todo.find( function( err, todos )
    {
        if( err ) {
            console.log( err );
        } else {
            res.json( todos );
        }
    } );
} );

// Endpoint to find by ID.
todoRoutes.route( '/:id' ).get( function( req, res )
{
    let id = req.params.id;
    Todo.findById( id, function( err, todo )
    {
        res.json( todo );
    } );
} );

// Endpoint to update by ID.
todoRoutes.route( '/update/:id' ).post( function( req, res )
{
    Todo.findById( req.params.id, function( err, todo )
    {
        if( !todo )
            res.status( 404 ).send( "data is not found" );
        else
            todo.todo_description = req.body.todo_description;
        todo.todo_responsible = req.body.todo_responsible;
        todo.todo_priority = req.body.todo_priority;
        todo.todo_completed = req.body.todo_completed;

        todo.save().then( todo =>
        {
            res.json( 'Todo updated!' );
        } )
            .catch( err =>
            {
                res.status( 400 ).send( "Update not possible" );
            } );
    } );
} );

// Endpoint to create a new record.
todoRoutes.route( '/add' ).post( function( req, res )
{
    let todo = new Todo( req.body );
    todo.save()
        .then( todo =>
        {
            res.status( 200 ).json( { 'todo': 'todo added successfully' } );
        } )
        .catch( err =>
        {
            res.status( 400 ).send( 'adding new todo failed' );
        } );
} );

// Add the router as middleware to manage all requests starting with "/todos".
app.use( '/todos', todoRoutes );

app.listen( PORT, function()
{
    console.log( "Server is running on Port: " + PORT );
} );
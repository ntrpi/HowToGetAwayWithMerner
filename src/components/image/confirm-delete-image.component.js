// This is the class we are going to extend.
import React, { Component } from 'react';

// I guess this is another react component that we are going to use.
import { Link } from 'react-router-dom';

// axios handles RESTful requests.
import axios from 'axios';

// Make this available to other stuff.
export default class ConfirmDeleteImage extends Component
{

    constructor( props )
    {
        super( props );

        // Do this to make "this" available to onSubmit.
        this.onSubmit = this.onSubmit.bind( this );

        console.log( props );

        // Initialize the state with an empty object called image.
        // We have to do this because it's the only way to have
        // member variables in a JS class.
        this.state = { 
            imageId: props.match.params.id, 
            image: {} 
        };
    }

    // Override this method to be called when the ImageList component is "mounted" successfully.
    componentDidMount()
    {
        // Access the image confirm delete endpoint.
        axios.get( 'http:///images/confirm-delete/' + this.state.imageId )
            .then( response =>
            {
                // I'm guessing we got back an array of objects.
                // Replace the empty array we initialized the state with
                // with the response data.
                this.setState( { image: response.data } );
                console.log( this.state.image );
            } )
            .catch( function( error )
            {
                console.log( error );
            } );
    }

    onSubmit( e )
    {
        e.preventDefault();
        console.log( this.state.image );

        const image = {
            image_name: this.state.image.image_name,
        };
        console.log( "Deleting image " + this.state.imageId );
        axios.post( 'http:///images/delete/' + this.state.imageId, image )
            .then( res => console.log( res.data ) );

        // Redirect back to the app's default route.
        this.props.history.push( '/image' );
    }

    // This is the one method you absolutely have to define when you extend Component.
    render()
    {
        console.log( "render confirm-delete-image" );
        return (

        <div className="m-2">
            <h3>Delete Image</h3>
            <div className="list-group m-2">
                <li className="list-group-item"><b>Name: </b>{this.state.image.image_name}</li>
            </div>
            <div className="d-flex flex-row">
                <div className="m-2">
                    <form onSubmit={ this.onSubmit }>
                        <div className="form-group">
                            <input type="submit" value="Delete" className="btn btn-light btn-outline-primary" />
                        </div>
                    </form>
                </div>
                <div className="m-2">
                    <Link className="btn btn-primary" to={ "/image/" }>Cancel</Link>
                </div>
            </div>
        </div>
        );
    }
};
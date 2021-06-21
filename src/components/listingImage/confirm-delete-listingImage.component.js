// This is the class we are going to extend.
import React, { Component } from 'react';

// I guess this is another react component that we are going to use.
import { Link } from 'react-router-dom';

// axios handles RESTful requests.
import axios from 'axios';

// Make this available to other stuff.
export default class ConfirmDeleteListingImage extends Component
{

    constructor( props )
    {
        super( props );

        // Do this to make "this" available to onSubmit.
        this.onSubmit = this.onSubmit.bind( this );

        console.log( props );

        // Initialize the state with an empty object called listingImage.
        // We have to do this because it's the only way to have
        // member variables in a JS class.
        this.state = { 
            listingImageId: props.match.params.id, 
            listingImage: {} 
        };
    }

    // Override this method to be called when the ListingImageList component is "mounted" successfully.
    componentDidMount()
    {
        // Access the listingImage confirm delete endpoint.
        axios.get( 'http:///listingImages/confirm-delete/' + this.state.listingImageId )
            .then( response =>
            {
                // I'm guessing we got back an array of objects.
                // Replace the empty array we initialized the state with
                // with the response data.
                this.setState( { listingImage: response.data } );
                console.log( this.state.listingImage );
            } )
            .catch( function( error )
            {
                console.log( error );
            } );
    }

    onSubmit( e )
    {
        e.preventDefault();
        console.log( this.state.listingImage );

        const listingImage = {
            listing_id: this.state.listingImage.listing_id,
            image_id: this.state.listingImage.image_id,
        };
        console.log( "Deleting listingImage " + this.state.listingImageId );
        axios.post( 'http:///listingImages/delete/' + this.state.listingImageId, listingImage )
            .then( res => console.log( res.data ) );

        // Redirect back to the app's default route.
        this.props.history.push( '/listingImage' );
    }

    // This is the one method you absolutely have to define when you extend Component.
    render()
    {
        console.log( "render confirm-delete-listingImage" );
        return (

        <div className="m-2">
            <h3>Delete ListingImage</h3>
            <div className="list-group m-2">
                <li className="list-group-item"><b>Listing ID: </b>{this.state.listingImage.listing_id}</li>
                <li className="list-group-item"><b>Image ID: </b>{this.state.listingImage.image_id}</li>
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
                    <Link className="btn btn-primary" to={ "/listingImage/" }>Cancel</Link>
                </div>
            </div>
        </div>
        );
    }
}
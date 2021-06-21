// This is the class we are going to extend.
import React, { Component } from 'react';

// I guess this is another react component that we are going to use.
import { Link } from 'react-router-dom';

// axios handles RESTful requests.
import axios from 'axios';


// Make this available to other stuff.
export default class ConfirmDeleteListing extends Component
{

    constructor( props )
    {
        super( props );
        this.onSubmit = this.onSubmit.bind( this );

        console.log( props );

     
        this.state = { 
            listingId: props.match.params.id, 
            listing: {} 
        };
    }
    componentDidMount()
    {
        // Access the user confirm delete endpoint.
        axios.get( '/listings/confirm-delete/' + this.state.listingId )
            .then( response =>
            {
                
                this.setState( { listing: response.data } );
                console.log( this.state.listing );
            } )
            .catch( function( error )
            {
                console.log( error );
            } );
    }

    onSubmit( e )
    {
        e.preventDefault();
        console.log( this.state.listing );

        const listing = {
            title: this.state.listing.title,
            description: this.state.listing.description,
            price: this.state.listing.price,
            user_id: this.state.listing.user_id,
            category_id: this.state.listing.category_id,
            is_flagged: this.state.listing.is_flagged,
        };
        console.log( "Deleting listing " + this.state.listingId );
        axios.post( '/listings/delete/' + this.state.listingId, listing )
            .then( res => console.log( res.data ) );

        // Redirect back to the app's default route.
        this.props.history.push( '/' );
    }


    render()
    {
        console.log( "render confirm-delete-listing" );
        return (

        <div className="m-2">
            <h3>Delete Listing</h3>
            <div className="list-group m-2">
                <li className="list-group-item"><b>Title: </b>{this.state.listing.title}</li>
                <li className="list-group-item"><b>Description: </b>{this.state.listing.description}</li>
                <li className="list-group-item"><b>Category: </b>{this.state.listing.category_id}</li>
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
                    <Link className="btn btn-primary" to={ "/" }>Cancel</Link>
                </div>
            </div>
        </div>
        );
    }
}
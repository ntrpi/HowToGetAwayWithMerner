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

        // Do this to make "this" available to onSubmit.
        this.onSubmit = this.onSubmit.bind( this );

        console.log( props );

        // Initialize the state with an empty object called user.
        // We have to do this because it's the only way to have
        // member variables in a JS class.
        this.state = { 
            listingID: props.match.params.id, 
            listing: {} 
        };
    }

    // Override this method to be called when the UserList component is "mounted" successfully.
    componentDidMount()
    {
        // Access the user confirm delete endpoint.
        axios.get( 'http://localhost:4000/listings/confirm-delete/' + this.state.listingID )
            .then( response =>
            {
                // I'm guessing we got back an array of objects.
                // Replace the empty array we initialized the state with
                // with the response data.
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
        console.log( this.state.user );

        const user = {
            title: this.state.listing.title,
            description: this.state.listing.description,
            price: this.state.listing.price,
            user_id: this.state.listing.user_id,
            category_id: this.state.listing.category_id,
            is_flagged: this.state.listing.is_flagged,

        };
        console.log( "Deleting user " + this.state.listingID );
        axios.post( 'http://localhost:4000/listings/delete/' + this.state.listingID, user )
            .then( res => console.log( res.data ) );

        // Redirect back to the app's default route.
        this.props.history.push( '/' );
    }

    // This is the one method you absolutely have to define when you extend Component.
    render()
    {
        console.log( "render confirm-delete-listing" );
        return (

        <div className="m-2">
            <h3>Delete User</h3>
            <div className="list-group m-2">
                <li className="list-group-item"><b>title: </b>{this.state.listing.title}</li>
                <li className="list-group-item"><b>description Code: </b>{this.state.listing.description}</li>
                <li className="list-group-item"><b>price: </b>{this.state.listing.price}</li>
                <li className="list-group-item"><b>user_id: </b>{this.state.listing.user_id}</li>
                <li className="list-group-item"><b>category_id </b>{this.state.listing.category_id}</li>
                <li className="list-group-item"><b>is_flagged: </b>{this.state.listing.is_flagged}</li>
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
                    <Link className="btn btn-primary" to={ "/listing/" }>Cancel</Link>
                </div>
            </div>
        </div>
        );
    }
}
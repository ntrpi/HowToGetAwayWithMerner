// This is the class we are going to extend.
import React, { Component } from 'react';

// I guess this is another react component that we are going to use.
import { Link } from 'react-router-dom';

// axios handles RESTful requests.
import axios from 'axios';

// This creates a reusable component that is putting the properties
// of the listing into a row element.
// I'm not sure I understand the syntax here. If props is a parameter
// why is it props.listing when it is called with currentListing below?
// Maybe the constructor wraps stuff passed to it with props?
const Listing = props => (
    <tr>
        <td >{props.listing.title}</td>
        <td >{props.listing.description}</td>
        <td >{props.listing.price}</td>
        <td >{props.listing.category_id}</td>
        <td >{props.listing.user_id}</td>
        <td >{props.listing.is_flagged.toString()}</td>
        <td>
            <Link to={ "/listing/edit/" + props.listing._id }>Edit</Link><br></br>
            <Link to={ "/listing/confirm-delete/" + props.listing._id }>Delete</Link><br></br>
            <Link to={ "/listing/details/" + props.listing._id }>Details</Link>

        </td>
    </tr>
);

// Make this available to other stuff.
export default class ListListings extends Component
{

    constructor( props )
    {
        super( props );

        // Initialize the state with an empty array called listings.
        // We have to do this because it's the only way to have
        // member variables in a JS class.
        this.state = { listings: [] };
    }

    // Override this method to be called when the ListingList component is "mounted" successfully.
    componentDidMount()
    {
        // Access the default listings endpoint.
        axios.get( 'http://localhost:4000/listings/' )
            .then( response =>
            {
                // I'm guessing we got back an array of objects.
                // Replace the empty array we initialized the state with
                // with the response data.
                this.setState( { listings: response.data } );
            } )
            .catch( function( error )
            {
                console.log( error );
            } );
    }

    // This function maps each item in the array to the Listing component declared above.
    listingList()
    {
        return this.state.listings.map( function( currentListing, i )
        {
            return <Listing listing={ currentListing } key={ i } />;
        } );
    }

    // This is the one method you absolutely have to define when you extend Component.
    render()
    {
        return (
            <div>
                <h3>Listings List</h3>
                <table className="table table-striped" style={ { marginTop: 20 } } >
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>User ID</th>
                            <th>Is Flagged</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.listingList() }
                    </tbody>
                </table>
            </div>
        );
    }
}
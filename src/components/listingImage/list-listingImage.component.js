// This is the class we are going to extend.
import React, { Component } from 'react';

// I guess this is another react component that we are going to use.
import { Link } from 'react-router-dom';

// axios handles RESTful requests.
import axios from 'axios';

// This creates a reusable component that is putting the properties
// of the listingImage into a row element.
// I'm not sure I understand the syntax here. If props is a parameter
// why is it props.listingImage when it is called with currentListingImage below?
// Maybe the constructor wraps stuff passed to it with props?
const ListingImage = props => (
    <tr>
        <td>{props.listingImage.listing_id}</td>
        <td>{props.listingImage.image_id}</td>
        <td>
            <Link to={ "/listingImage/confirm-delete/" + props.listingImage._id }>Delete</Link><br></br>
        </td>
    </tr>
);

// Make this available to other stuff.
export default class ListingImagesList extends Component
{

    constructor( props )
    {
        super( props );

        // Initialize the state with an empty array called listingImages.
        // We have to do this because it's the only way to have
        // member variables in a JS class.
        this.state = { listingImages: [] };
    }

    // Override this method to be called when the ListingImageList component is "mounted" successfully.
    componentDidMount()
    {
        // Access the default listingImages endpoint.
        axios.get( '/listingImages/' )
            .then( response =>
            {
                // I'm guessing we got back an array of objects.
                // Replace the empty array we initialized the state with
                // with the response data.
                this.setState( { listingImages: response.data } );
            } )
            .catch( function( error )
            {
                console.log( error );
            } );
    }

    // This function maps each item in the array to the ListingImage component declared above.
    listingImageList()
    {
        return this.state.listingImages.map( function( currentListingImage, i )
        {
            return <ListingImage listingImage={ currentListingImage } key={ i } />;
        } );
    }

    // This is the one method you absolutely have to define when you extend Component.
    render()
    {
        return (
            <div>
                <h3>ListingImages List</h3>
                <table className="table table-striped" style={ { marginTop: 20 } } >
                    <thead>
                        <tr>
                            <th>Listing ID</th>
                            <th>Image ID</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.listingImageList() }
                    </tbody>
                </table>
            </div>
        );
    }
}
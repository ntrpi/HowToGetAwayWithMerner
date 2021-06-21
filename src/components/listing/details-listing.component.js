import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ListingImage = props => (
    <div style={{ display: 'inline' }} >
        <img src={ process.env.PUBLIC_URL +  "/img/" + props.imgName } alt={ props.alt } height="150px" style={{margin: 30}} />
    </div>
);

//Maing the listings globally available
export default class ListingDetails extends Component
{
    constructor( props )
    {
        super( props );
        console.log(props);

        this.state ={
            listingId: props.match.params.id,
            listing:{},
            listingImages: []
        };
    }

    // This function maps each item in the array to the Listing component declared above.
    listingImagesList()
    {
        const altText = this.state.listing ? this.state.listing.title : "Listing.";
        return this.state.listingImages.map( function( imageName, i )
        {
            console.log( imageName );
            return <ListingImage 
                alt={ altText } 
                imgName={ imageName } 
                key={ i } />;
        } );
    }

    componentDidMount()
    {
        axios.get( '/listings/' + this.state.listingId )
        .then( response => {
            //sets listing from this.setstate above
            this.setState( { listing:response.data } );

            axios.get( '/listingImages/images/' + this.state.listingId )
            .then( response => {
                this.setState( { listingImages: response.data } );
            } )
            //If it fails send an error
            .catch(function(error){
                console.log(error);
            });
 
        } )
        //If it fails send an error
        .catch(function(error){
            console.log(error);
        });

    }

    render()
    {
        return (
            <div className="m-2">
                <h3>Details</h3>
                <div className="list-group m-2">
                    <li className="list-group-item"><b>Title: </b>{this.state.listing.title}</li>
                    <li className="list-group-item">Description:{this.state.listing.description}</li>
                    <li className="list-group-item">Price:{this.state.listing.price}</li>
                </div>
                <div id="categories">
                    
                        <li className="list-group-item">Category: {this.state.listing.category_id}</li>
                    
                </div>
                <div>
                    { this.listingImagesList() }
                </div>
                <div className="d-flex flex-row">
                    <div className="m-2">
                        <Link className="btn btn-primary" to={ "/listing/edit/" + this.state.listing._id }>Edit</Link>
                    </div>
                    <div className="m-2">
                        <Link className="btn btn-primary" to={ "/listing/confirm-delete/" + this.state.listing._id }>Delete</Link>
                    </div>
                </div>
            </div>
        );
    }
};
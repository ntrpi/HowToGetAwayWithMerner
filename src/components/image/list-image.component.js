// This is the class we are going to extend.
import React, { Component } from 'react';

// I guess this is another react component that we are going to use.
import { Link } from 'react-router-dom';

// axios handles RESTful requests.
import axios from 'axios';

// This creates a reusable component that is putting the properties
// of the image into a row element.
// I'm not sure I understand the syntax here. If props is a parameter
// why is it props.image when it is called with currentImage below?
// Maybe the constructor wraps stuff passed to it with props?
const Image = props => (
    <tr>
        <td>{props.image._id}</td>
        <td>{props.image.image_name}</td>
        <td>
            <Link to={ "/image/confirm-delete/" + props.image._id }>Delete</Link><br></br>
        </td>
    </tr>
);

// Make this available to other stuff.
export default class ImagesList extends Component
{

    constructor( props )
    {
        super( props );

        // Initialize the state with an empty array called images.
        // We have to do this because it's the only way to have
        // member variables in a JS class.
        this.state = { images: [] };
    }

    // Override this method to be called when the ImageList component is "mounted" successfully.
    componentDidMount()
    {
        // Access the default images endpoint.
        axios.get( '/images/' )
            .then( response =>
            {
                // I'm guessing we got back an array of objects.
                // Replace the empty array we initialized the state with
                // with the response data.
                this.setState( { images: response.data } );
            } )
            .catch( function( error )
            {
                console.log( error );
            } );
    }

    // This function maps each item in the array to the Image component declared above.
    imageList()
    {
        return this.state.images.map( function( currentImage, i )
        {
            return <Image image={ currentImage } key={ i } />;
        } );
    }

    // This is the one method you absolutely have to define when you extend Component.
    render()
    {
        return (
            <div>
                <h3>Images List</h3>
                <table className="table table-striped" style={ { marginTop: 20 } } >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.imageList() }
                    </tbody>
                </table>
            </div>
        );
    }
}
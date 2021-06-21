import React, { useState } from 'react';
import axios from 'axios';

const CreateListingImage = ( props ) =>
{
    const listingId = props.match.params.id;
    
    const [newListingImage, setListingImage] = useState(
        {
            listing_id: listingId,
            image: ''
        } );

    const [newImageFile, setImageFile] = useState(
        {
            imageFile: ''
        } );

    const onSubmit = (e) =>
    {
        e.preventDefault();

        // Create the form data to send.
        const formData = new FormData();
        formData.append( 'image', newListingImage.image );

        // Do the post.
        axios.post( '/images/add/', formData )
            .then( res => {

                // Create an object to send in the post.
                const listingImage = {
                    listing_id: listingId,
                    image_id: res.data.image._id
                };

                // Do the second post.
                axios.post( '/listingImages/add/', listingImage )
                    .then(
                        window.location.href = "/listing/details/" + listingId
                    );
            } )
            .catch(err => {
                console.log(err);
            } );
    };

    const onListingImageChange = (e) =>
    {
        setListingImage( { 
            ...newListingImage, 
            image: e.target.files[0] 
        } );

        setImageFile( {
            ...newImageFile,
            imageFile: URL.createObjectURL(e.target.files[0])
        } );

        document.getElementById( "imageDiv" ).style.display = "block";
    };

    return (
        <div style={ { marginTop: 10 } }>
            <h3>Add an Image to Your Listing</h3>

            <div id="imageDiv" style={{display: newImageFile.imageFile ? 'block' : 'none' }}>
                <img src={ newImageFile.imageFile } height="200px" style={{margin: 30}} />
            </div>

            <form onSubmit={ onSubmit } encType='multipart/form-data'>

                <div className="form-group">
                    <label hidden={ true }>Listing Image: </label>
                    <input type="file"
                        accept=".png, .jpg, .jpeg"
                        className="form-control"
                        name="image"
                        onChange={ onListingImageChange }
                    />
                </div>
                <div className="form-group m-2">
                    <input type="submit" value="Add Image" className="btn btn-primary" />
                </div>
                </form>
        </div>
    );
};

export default CreateListingImage;

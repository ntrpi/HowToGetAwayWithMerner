import React, { useState } from 'react';
import axios from 'axios';

const CreateImage = () =>
{
    const [newImage, setImage] = useState(
        {
            image: '',
        }
    );

    const onSubmit = (e) =>
    {
        e.preventDefault();

        // Create the form data to send.
        const formData = new FormData();
        formData.append( 'image', newImage.image );

        // Do the post.
        axios.post('http:///images/add/', formData)
            .then( res => {
                window.location.href = "/image/" + res.data.image._id;
            } )
            .catch(err => {
                console.log(err);
            } );
    };

    const onImageChange = (e) =>
    {
        setImage( { ...newImage, image: e.target.files[0] } );
    };

    return (
        <div style={ { marginTop: 10 } }>
            <h3>Create New Image</h3>

            <form onSubmit={ onSubmit } encType='multipart/form-data'>

                <div className="form-group">
                    <label>Image: </label>
                    <input type="file"
                        accept=".png, .jpg, .jpeg"
                        className="form-control"
                        name="image"
                        onChange={ onImageChange }
                    />
                </div>
                <div className="form-group m-2">
                    <input type="submit" value="Create Image" className="btn btn-primary" />
                </div>
                </form>
        </div>
    );
};

export default CreateImage;

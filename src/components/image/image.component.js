// This is the class we are going to extend.
import React, { Component } from 'react';

// axios handles RESTful requests.
import axios from 'axios';

export default class Image extends Component
{
    constructor( props )
    {
        super( props );

        this.state ={
            imageId: props.match.params.id,
            altText: props.match.params.alt,
            image: {}
        };

    }

    componentDidMount()
    {
        axios.get( 'http:///images/' + this.state.imageId )
        .then(response =>{
            //sets the user from this.setstate above
            this.setState({image: response.data})
        })
        //If it fails send an error
        .catch(function(error){
            console.log(error);
        });

    }
    
    render()
    {
        return(
            <img src={ "img/" + this.state.image.image_name } alt={ this.state.altText } />
        );
    }

}

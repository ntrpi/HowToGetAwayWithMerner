import React, { Component } from 'react';
import axios from 'axios';

export default class CreateListing extends Component
{
    constructor( props )
    {
        super( props );

        this.onChangeTitle = this.onChangeTitle.bind( this );
        this.onChangeDescription = this.onChangeDescription.bind( this );
        this.onChangePrice = this.onChangePrice.bind( this );
        this.onChangeCategory = this.onChangeCategory.bind( this );
        this.onChangeUserEmail = this.onChangeUserEmail.bind( this );

        this.onSubmit = this.onSubmit.bind( this );

        this.state = {
            title: '',
            description: '',
            price: '',
            user_email: '',
            category_id: '',
            is_flagged: 'false',
        };
    }

    onChangeTitle( e )
    {
        this.setState( {
            title: e.target.value
        } );
    }

    onChangeDescription( e )
    {
        this.setState( {
            description: e.target.value
        } );
    }

    onChangePrice( e )
    {
        this.setState( {
            price: e.target.value
        } );
    }

    onChangeUserEmail(e)
    {
        this.setState( {
            user_email: e.target.value
        });
    }

    onChangeCategory( e )
    {
        this.setState( {
            category_id: e.target.value
        } );
    }

    isValidTitle( title ) 
    {
        //Checks against NULL
        if( ( title === null ) || title === "" ) {
            return "Title required";
        }

        //Checks against regex
        if( ( title.length < 3 ) || ( title === "" ) ) {
            return "title must be at least 3 characters long";
        }
        return null;
    }

    isValidDescription( description ) 
    {
        //Checks against NULL
        if( ( description === null ) || description === "" ) {
            return "Description required";
        }

        //Checks against regex
        if( ( description.length < 7 ) || ( description === "" ) ) {
            return "Description must be atleast 7 characters long";
        }
        return null;
    }

    isValidPrice( price ) 
    {
        //Checks against NULL
        if( ( price === null ) || price === "" ) {
            return "Price required";
        }

        //Checks against regex
        if( !/^[0-9]*$/.test( price ) ) {
            return "Description must be atleast a number";
        }
        return null;
    }

    isValidUserEmail( email ) 
    {
        //Checks against NULL
        if( ( email === null ) || email === "" ) {
            return "Email required";
        }

        //Checks against regex
        if( !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test( email ) ) {
            return "Invalid Email";
        }
        return null;
    }

    isValidCategory( category ) 
    {
        //Checks against NULL
        if( ( category === null ) || category === "" ) {
            return "category required";
        }
        return null;
    }

    //Validation 
    //SUBMIT FORM
    onSubmit( e )
    {
        e.preventDefault();
        this.setState( {
            titleError: "",
            descriptionError:"",
            priceError: "",
            userEmailError:"",
            categoryError:"",
        } );

        let titleResult = this.isValidTitle(this.state.title);
        if( titleResult !== null ) {
            this.setState( { titleError: titleResult} )
            return;
        }

        //Description
        let descriptionResult = this.isValidDescription(this.state.description);
        if( descriptionResult !== null ) {
            this.setState( { descriptionError: descriptionResult} )
            return;
        }

        //Price
        let priceResult = this.isValidPrice(this.state.price);
        if( priceResult !== null ) {
            this.setState( { priceError: priceResult} )
            return;
        }

        //Email
        let userEmailResult = this.isValidUserEmail(this.state.user_email);
        if( userEmailResult !== null ) {
            this.setState( { userEmailError: userEmailResult} )
            return;
        }

        //Category
        let categoryResult = this.isValidCategory(this.state.category_id);
        if( categoryResult !== null ) {
            this.setState( { categoryError: categoryResult} )
            return;
        }

        // Create an object to send in the post.
        const newListing = {
            title: this.state.title,
            description: this.state.description,
            price: this.state.price,
            user_email: this.state.user_email,
            category_id: this.state.category_id,
            is_flagged: this.state.is_flagged,
        };

        // Do the post.
        axios.post( '/listings/add', newListing )
            .then(
                res => this.props.history.push( '/listingImage/create/' + res.data.listing._id )
            );
        //window.location = '/';
    }

    render()
    {
        return (
            <div style={ { marginTop: 10 } }>
                <h3>Create New Listing</h3>

                <form onSubmit={ this.onSubmit } encType='multipart/form-data'>

                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text"
                            
                            className="form-control"
                            value={ this.state.title }
                            onChange={ this.onChangeTitle }
                        />
                    </div>
                    <div style={ { fontSize: 12, color: "red" } }>
                        { this.state.titleError }
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={ this.state.description }
                            onChange={ this.onChangeDescription }
                        />
                    </div>
                    <div style={ { fontSize: 12, color: "red" } }>
                        { this.state.descriptionError }
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                            <input
                                type="number"
                                className="form-control"
                                value={ this.state.price }
                                onChange={ this.onChangePrice}
                        />
                    </div>
                    <div style={ { fontSize: 12, color: "red" } }>
                        { this.state.priceError }
                    </div>
                    <div className="form-group">
                        <label>User Email: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={ this.state.user_email }
                                onChange={ this.onChangeUserEmail}
                        />
                    </div>
                    <div style={ { fontSize: 12, color: "red" } }>
                        { this.state.userEmailError }
                    </div>
                    
                    <div className="form-group">
                        <label>Category ID: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={ this.state.category_id }
                            onChange={ this.onChangeCategory }
                        />
                        
                    </div>
                    <div style={ { fontSize: 12, color: "red" } }>
                        { this.state.categoryError }
                    </div>
                    {/* <div className="form-group">
                        <label>Listing Photo </label>
                        <input
                            type="file"
                            accept = ".png, .jpg, .jpeg"
                            name="photo"
                            className="form-control"
                            // value={ this.state.photo } I dont think value is needed, the value should be the uploaded photo
                            onChange={ this.onChangePhoto }
                        />
                        
                    </div> */}

                    <div className="form-group m-2">
                        <input type="submit" value="Create Listing" className="btn btn-primary" />
                    </div>
                    </form>
            </div>
        );
    }
};
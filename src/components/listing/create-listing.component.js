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
//STATE IS HOW YOU CREATE VAR IN REACT
        this.state = {
            title: '',
            description: '',
            price: '',
            user_email: '',
            category_id: '',
            is_flagged: 'false'   
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
   

    //SUBMIT FORM
    onSubmit( e )
    {
        e.preventDefault();

        // Create an object to send in the post.
        const newListing = {
            title: this.state.title,
            description: this.state.description,
            price: this.state.price,
            user_email: this.state.user_email,
            category_id: this.state.category_id,
            is_flagged: this.state.is_flagged
        };

        // Do the post.
        axios.post( 'http://localhost:4000/listings/add', newListing )
            .then(
                res => this.props.history.push( '/listing/details/' + res.data.listing._id )
            );
        //window.location = '/';
    }

    render()
    {
        return (
            <div style={ { marginTop: 10 } }>
                <h3>Create New Listing</h3>

                <form onSubmit={ this.onSubmit }>

                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text"
                            
                            className="form-control"
                            value={ this.state.title }
                            onChange={ this.onChangeTitle }
                        />
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
   
                    <div className="form-group">
                        <label>Price: </label>
                            <input
                                type="number"
                                className="form-control"
                                value={ this.state.price }
                                onChange={ this.onChangePrice}
                        />
                    </div>
                    <div className="form-group">
                        <label>User ID: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={ this.state.user_email }
                                onChange={ this.onChangeUserEmail}
                        />
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
                   

                    <div className="form-group m-2">
                        <input type="submit" value="Create Listing" className="btn btn-primary" />
                    </div>
                    </form>
            </div>
        );
    }
};
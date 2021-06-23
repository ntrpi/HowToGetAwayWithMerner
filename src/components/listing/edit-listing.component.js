import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class EditListing extends Component
{
    constructor( props )
    {
        super( props );

        this.onChangeTitle = this.onChangeTitle.bind( this );
        this.onChangeDescription = this.onChangeDescription.bind( this );
        this.onChangePrice = this.onChangePrice.bind( this );
        this.onChangeCategory = this.onChangeCategory.bind( this );
        this.onChangeUserID = this.onChangeUserID.bind( this );

        this.onChangeListingFlagged = this.onChangeListingFlagged.bind( this );

        this.onSubmit = this.onSubmit.bind( this );
//STATE IS HOW YOU CREATE VAR IN REACT
        this.state = {
            title: '',
            description: '',
            price: '',
            user_id: '',
            category_id: '',
            is_flagged: false   
        };
    }

componentDidMount(){
    //CHANGE REQUEST
    axios.get( 'http://localhost:4000/listings/' + this.props.match.params.id )
    .then(response =>
        {
            this.setState({
                title: response.data.title,
                description: response.data.description,
                price: response.data.price,
                user_id: response.data.user_id,
                category_id: response.data.category_id,
                is_flagged: response.data.is_flagged,

            });
        })
        .catch(function(error) 
        {
            console.log(error);   
        });
}
    onChangeListingFlagged(e){
        this.setState( {
        is_flagged: e.target.value
        } );
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
    onChangeUserID(e)
    {
        this.setState( {
            user_id: e.target.value
        });
    }
    onChangeCategory( e )
    {
        this.setState( {
            category_id: e.target.value
        } );
    }
   //A

    //SUBMIT FORM
    onSubmit( e )
    {
        e.preventDefault();

        // Create an object to send in the post.
        const newListing = {
            title: this.state.title,
            description: this.state.description,
            price: this.state.price,
            user_id: this.state.user_id,
            category_id: this.state.category_id,
            is_flagged: this.state.is_flagged
        };

        // Do the post.
        axios.post( 'http://localhost:4000/listings/update/'+this.props.match.params.id, newListing )
            .then(res => console.log(res.data));

        //window.location = '/';
        this.props.history.push('/')

    }

    render()
    {
        return (
            <div style={ { marginTop: 10 } }>
                <h3>Update</h3>

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
                        <label>Category ID: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={ this.state.category_id }
                            onChange={ this.onChangeCategory }
                        />
                        
                    </div>
                    <div className="form-group">
                        <label>Flaged</label>
                        <br/>
                        <select value={ this.state.is_flagged} onChange={ this.onChangeListingFlagged } className="btn btn-secondary dropdown-toggle" >
                            <option value={true}>FLAGGED</option>
                            <option value={false}>NOT FLAGGED</option>
                          

                        </select>
                    </div>

                    <div className="form-group m-2">
                        <input type="submit" value="Update Listing" className="btn btn-primary" />
                    </div>
                </form>
                <Link to={ "/listingImage/create/" + this.props.match.params.id }>Add Image</Link><br></br>
            </div>
        );
    }
};
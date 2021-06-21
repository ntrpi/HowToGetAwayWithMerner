import React, { Component } from 'react';
import axios from 'axios';

export default class CreateRole extends Component
{
    constructor( props )
    {
        super( props );

        this.onChangeName = this.onChangeName.bind( this );
        this.onSubmit = this.onSubmit.bind( this );

        //STATE IS HOW YOU CREATE VAR IN REACT
        this.state = {
            role_name: '',
        };
    }

    onChangeName( e )
    {
        this.setState( {
            role_name: e.target.value
        } );
    }

    //SUBMIT FORM
    onSubmit( e )
    {
        e.preventDefault();

        // Create an object to send in the post.
        const newRole = {
            role_name: this.state.role_name
        };

        // Do the post.
        axios.post( '/roles/add', newRole )
            .then(
                res => this.props.history.push( '/role/' )
            );
        //window.location = '/';
    }

    render()
    {
        return (
            <div style={ { marginTop: 10 } }>
                <h3>Create New Role</h3>

                <form onSubmit={ this.onSubmit }>

                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                            
                            className="form-control"
                            value={ this.state.role_name }
                            onChange={ this.onChangeName }
                        />
                    </div>
                    <div className="form-group m-2">
                        <input type="submit" value="Create Role" className="btn btn-primary" />
                    </div>
                    </form>
            </div>
        );
    }
};
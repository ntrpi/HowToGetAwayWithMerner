import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUserRole extends Component
{
    constructor( props )
    {
        super( props );

        this.onChangeUserId = this.onChangeUserId.bind( this );
        this.onChangeRoleId = this.onChangeRoleId.bind( this );
        this.onSubmit = this.onSubmit.bind( this );

        //STATE IS HOW YOU CREATE VAR IN REACT
        this.state = {
            name: '',
        };
    }

    onChangeUserId( e )
    {
        this.setState( {
            user_id: e.target.value
        } );
    }

    onChangeRoleId( e )
    {
        this.setState( {
            role_id: e.target.value
        } );
    }

    //SUBMIT FORM
    onSubmit( e )
    {
        e.preventDefault();

        // Create an object to send in the post.
        const newUserRole = {
            user_id: this.state.user_id,
            role_id: this.state.role_id,
        };

        // Do the post.
        axios.post( 'http:///userRoles/add', newUserRole )
            .then(
                res => this.props.history.push( '/userRole' )
            );
        //window.location = '/';
    }

    render()
    {
        return (
            <div style={ { marginTop: 10 } }>
                <h3>Create New User Role</h3>

                <form onSubmit={ this.onSubmit }>
                <div className="form-group">
                        <label>User ID: </label>
                        <input type="text"
                            className="form-control"
                            value={ this.state.user_id }
                            onChange={ this.onChangeUserId } />
                    </div>
                    <div className="form-group">
                        <label>Role ID: </label>
                        <input type="text"
                            className="form-control"
                            value={ this.state.role_id }
                            onChange={ this.onChangeRoleId } />
                    </div>
                    <div className="form-group m-2">
                        <input type="submit" value="Create User Role" className="btn btn-primary" />
                    </div>
                    </form>
            </div>
        );
    }
};
// This is the class we are going to extend.
import React, { Component } from 'react';

// I guess this is another react component that we are going to use.
import { Link } from 'react-router-dom';

// axios handles RESTful requests.
import axios from 'axios';

// Make this available to other stuff.
export default class ConfirmDeleteUser extends Component
{

    constructor( props )
    {
        super( props );

        // Do this to make "this" available to onSubmit.
        this.onSubmit = this.onSubmit.bind( this );

        console.log( props );

        // Initialize the state with an empty object called user.
        // We have to do this because it's the only way to have
        // member variables in a JS class.
        this.state = { 
            userId: props.match.params.id, 
            user: {} 
        };
    }

    // Override this method to be called when the UserList component is "mounted" successfully.
    componentDidMount()
    {
        // Access the user confirm delete endpoint.
        axios.get( 'http://localhost:4000/users/confirm-delete/' + this.state.userId )
            .then( response =>
            {
                // I'm guessing we got back an array of objects.
                // Replace the empty array we initialized the state with
                // with the response data.
                this.setState( { user: response.data } );
                console.log( this.state.user );
            } )
            .catch( function( error )
            {
                console.log( error );
            } );
    }

    onSubmit( e )
    {
        e.preventDefault();
        console.log( this.state.user );

        const user = {
            user_email: this.state.user.user_email,
            user_password: this.state.user.user_password,
            user_postal_code: this.state.user.user_postal_code,
            user_status: this.state.user.user_status
        };
        console.log( "Deleting user " + this.state.userId );
        axios.post( 'http://localhost:4000/users/delete/' + this.state.userId, user )
            .then( res => console.log( res.data ) );

        // Redirect back to the app's default route.
        this.props.history.push( '/user' );
    }

    // This is the one method you absolutely have to define when you extend Component.
    render()
    {
        console.log( "render confirm-delete-user" );
        return (

        <div className="m-2">
            <h3>Delete User</h3>
            <div className="list-group m-2">
                <li className="list-group-item"><b>Email: </b>{this.state.user.user_email}</li>
                <li className="list-group-item"><b>Postal Code: </b>{this.state.user.user_postal_code}</li>
                <li className="list-group-item"><b>Status: </b>{this.state.user.user_status}</li>
            </div>
            <div className="d-flex flex-row">
                <div className="m-2">
                    <form onSubmit={ this.onSubmit }>
                        <div className="form-group">
                            <input type="submit" value="Delete" className="btn btn-light btn-outline-primary" />
                        </div>
                    </form>
                </div>
                <div className="m-2">
                    <Link className="btn btn-primary" to={ "/user/" }>Cancel</Link>
                </div>
            </div>
        </div>
        );
    }
}
// This is the class we are going to extend.
import React, { Component } from 'react';

// I guess this is another react component that we are going to use.
import { Link } from 'react-router-dom';

// axios handles RESTful requests.
import axios from 'axios';

// Make this available to other stuff.
export default class ConfirmDeleteUserRole extends Component
{

    constructor( props )
    {
        super( props );

        // Do this to make "this" available to onSubmit.
        this.onSubmit = this.onSubmit.bind( this );

        console.log( props );

        // Initialize the state with an empty object called userRole.
        // We have to do this because it's the only way to have
        // member variables in a JS class.
        this.state = { 
            userRoleId: props.match.params.id, 
            userRole: {} 
        };
    }

    // Override this method to be called when the UserRoleList component is "mounted" successfully.
    componentDidMount()
    {
        // Access the userRole confirm delete endpoint.
        axios.get( 'http:///userRoles/confirm-delete/' + this.state.userRoleId )
            .then( response =>
            {
                // I'm guessing we got back an array of objects.
                // Replace the empty array we initialized the state with
                // with the response data.
                this.setState( { userRole: response.data } );
                console.log( this.state.userRole );
            } )
            .catch( function( error )
            {
                console.log( error );
            } );
    }

    onSubmit( e )
    {
        e.preventDefault();
        console.log( this.state.userRole );

        const userRole = {
            user_id: this.state.userRole.user_id,
            role_id: this.state.userRole.role_id,
        };
        console.log( "Deleting userRole " + this.state.userRoleId );
        axios.post( 'http:///userRoles/delete/' + this.state.userRoleId, userRole )
            .then( res => console.log( res.data ) );

        // Redirect back to the app's default route.
        this.props.history.push( '/userRole' );
    }

    // This is the one method you absolutely have to define when you extend Component.
    render()
    {
        console.log( "render confirm-delete-userRole" );
        return (

        <div className="m-2">
            <h3>Delete UserRole</h3>
            <div className="list-group m-2">
                <li className="list-group-item"><b>User ID: </b>{this.state.userRole.user_id}</li>
                <li className="list-group-item"><b>Role ID: </b>{this.state.userRole.role_id}</li>
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
                    <Link className="btn btn-primary" to={ "/userRole/" }>Cancel</Link>
                </div>
            </div>
        </div>
        );
    }
}
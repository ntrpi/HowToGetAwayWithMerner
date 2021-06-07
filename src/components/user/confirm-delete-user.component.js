// This is the class we are going to extend.
import React, { Component } from 'react';

// I guess this is another react component that we are going to use.
import { Link } from 'react-router-dom';

// axios handles RESTful requests.
import axios from 'axios';

// This creates a reusable component that is putting the properties
// of the user into a row element.
// I'm not sure I understand the syntax here. If props is a parameter
// why is it props.user when it is called with currentUser below?
// Maybe the constructor wraps stuff passed to it with props?
const User = props => (

    <div className="m-2">
        <h3>Delete User</h3>
        <div className="list-group m-2">
            <li className="list-group-item"><b>Email: </b>{props.user.user_email}</li>
            <li className="list-group-item"><b>Postal Code: </b>{props.user.user_postal_code}</li>
            <li className="list-group-item"><b>Status: </b>{props.user.user_status}</li>
        </div>
        <div className="d-flex flex-row">
            <div className="m-2">
                <Link className="btn btn-light btn-outline-primary" to={ "/user/delete/" + props.user._id }>Delete</Link>
            </div>
            <div className="m-2">
                <Link className="btn btn-primary" to={ "/user/" }>Cancel</Link>
            </div>
        </div>
    </div>
);

// Make this available to other stuff.
export default class ConfirmDeleteUser extends Component
{

    constructor( props )
    {
        super( props );

        console.log( props );

        // Initialize the state with an empty object called user.
        // We have to do this because it's the only way to have
        // member variables in a JS class.
        this.state = { userId: props.match.params.id, user: {} };
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
            } )
            .catch( function( error )
            {
                console.log( error );
            } );
    }

    // This function maps each item in the array to the User component declared above.
    userDetails()
    {
        return <User user={ this.state.user } />;
    }

    // This is the one method you absolutely have to define when you extend Component.
    render()
    {
        console.log( "render confirm-delete-user" );
        return (
            <div>
                { this.userDetails() }
            </div>
        );
    }
}
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
    <tr>
        <td >{props.user.user_email}</td>
        <td >{props.user.user_password}</td>
        <td >{props.user.user_postal_code}</td>
        <td >{props.user.user_status}</td>
        <td>
            <Link to={ "/user/edit/" + props.user._id }>Edit</Link><br></br>
            <Link to={ "/user/confirm-delete/" + props.user._id }>Delete</Link><br></br>
            <Link to={ "/user/details/" + props.user._id }>Details</Link>

        </td>
    </tr>
);

// Make this available to other stuff.
export default class ListUsers extends Component
{

    constructor( props )
    {
        super( props );

        // Initialize the state with an empty array called users.
        // We have to do this because it's the only way to have
        // member variables in a JS class.
        this.state = { users: [] };
    }

    // Override this method to be called when the UserList component is "mounted" successfully.
    componentDidMount()
    {
        // Access the default users endpoint.
        axios.get( 'http://localhost:4000/users/' )
            .then( response =>
            {
                // I'm guessing we got back an array of objects.
                // Replace the empty array we initialized the state with
                // with the response data.
                this.setState( { users: response.data } );
            } )
            .catch( function( error )
            {
                console.log( error );
            } );
    }

    // This function maps each item in the array to the User component declared above.
    userList()
    {
        return this.state.users.map( function( currentUser, i )
        {
            return <User user={ currentUser } key={ i } />;
        } );
    }

    // This is the one method you absolutely have to define when you extend Component.
    render()
    {
        return (
            <div>
                <h3>Users List</h3>
                <table className="table table-striped" style={ { marginTop: 20 } } >
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Postal Code</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.userList() }
                    </tbody>
                </table>
            </div>
        );
    }
}
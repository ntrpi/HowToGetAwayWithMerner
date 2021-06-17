// This is the class we are going to extend.
import React, { Component } from 'react';

// I guess this is another react component that we are going to use.
import { Link } from 'react-router-dom';

// axios handles RESTful requests.
import axios from 'axios';

// This creates a reusable component that is putting the properties
// of the userRole into a row element.
// I'm not sure I understand the syntax here. If props is a parameter
// why is it props.userRole when it is called with currentUserRole below?
// Maybe the constructor wraps stuff passed to it with props?
const UserRole = props => (
    <tr>
        <td>{props.userRole.user_id}</td>
        <td>{props.userRole.role_id}</td>
        <td>
            <Link to={ "/userRole/confirm-delete/" + props.userRole._id }>Delete</Link><br></br>
        </td>
    </tr>
);

// Make this available to other stuff.
export default class UserRolesList extends Component
{

    constructor( props )
    {
        super( props );

        // Initialize the state with an empty array called userRoles.
        // We have to do this because it's the only way to have
        // member variables in a JS class.
        this.state = { userRoles: [] };
    }

    // Override this method to be called when the UserRoleList component is "mounted" successfully.
    componentDidMount()
    {
        // Access the default userRoles endpoint.
        axios.get( 'http://localhost:4000/userRoles/' )
            .then( response =>
            {
                // I'm guessing we got back an array of objects.
                // Replace the empty array we initialized the state with
                // with the response data.
                this.setState( { userRoles: response.data } );
            } )
            .catch( function( error )
            {
                console.log( error );
            } );
    }

    // This function maps each item in the array to the UserRole component declared above.
    userRoleList()
    {
        return this.state.userRoles.map( function( currentUserRole, i )
        {
            return <UserRole userRole={ currentUserRole } key={ i } />;
        } );
    }

    // This is the one method you absolutely have to define when you extend Component.
    render()
    {
        return (
            <div>
                <h3>UserRoles List</h3>
                <table className="table table-striped" style={ { marginTop: 20 } } >
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Role ID</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.userRoleList() }
                    </tbody>
                </table>
            </div>
        );
    }
}
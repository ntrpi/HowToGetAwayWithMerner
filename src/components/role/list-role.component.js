// This is the class we are going to extend.
import React, { Component } from 'react';

// I guess this is another react component that we are going to use.
import { Link } from 'react-router-dom';

// axios handles RESTful requests.
import axios from 'axios';

// This creates a reusable component that is putting the properties
// of the role into a row element.
// I'm not sure I understand the syntax here. If props is a parameter
// why is it props.role when it is called with currentRole below?
// Maybe the constructor wraps stuff passed to it with props?
const Role = props => (
    <tr>
        <td>{props.role._id}</td>
        <td>{props.role.role_name}</td>
        <td>
            <Link to={ "/role/confirm-delete/" + props.role._id }>Delete</Link><br></br>
        </td>
    </tr>
);

// Make this available to other stuff.
export default class RolesList extends Component
{

    constructor( props )
    {
        super( props );

        // Initialize the state with an empty array called roles.
        // We have to do this because it's the only way to have
        // member variables in a JS class.
        this.state = { roles: [] };
    }

    // Override this method to be called when the RoleList component is "mounted" successfully.
    componentDidMount()
    {
        // Access the default roles endpoint.
        axios.get( '/roles/' )
            .then( response =>
            {
                // I'm guessing we got back an array of objects.
                // Replace the empty array we initialized the state with
                // with the response data.
                this.setState( { roles: response.data } );
            } )
            .catch( function( error )
            {
                console.log( error );
            } );
    }

    // This function maps each item in the array to the Role component declared above.
    roleList()
    {
        return this.state.roles.map( function( currentRole, i )
        {
            return <Role role={ currentRole } key={ i } />;
        } );
    }

    // This is the one method you absolutely have to define when you extend Component.
    render()
    {
        return (
            <div>
                <h3>Roles List</h3>
                <table className="table table-striped" style={ { marginTop: 20 } } >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.roleList() }
                    </tbody>
                </table>
            </div>
        );
    }
}
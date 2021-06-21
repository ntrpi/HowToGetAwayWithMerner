// This is the class we are going to extend.
import React, { Component } from 'react';
// Allows easy routing
import { Link } from 'react-router-dom';
// axios handles RESTful requests.
import axios from 'axios';

//Make this class globaly usable
export default class UserDetails extends Component
{
    constructor(props){
        super (props)
        console.log (props);
        //Because React is weird like that, you need to create an empty user, to put the user into
        this.state ={
            userId: props.match.params.id,
            user:{}
        };
    }

    componentDidMount()
    {
        axios.get( '/users/' + this.state.userId )
        .then(response =>{
            //sets the user from this.setstate above
            this.setState({user:response.data})
        })
        //If it fails send an error
        .catch(function(error){
            console.log(error);
        });

    }
    
    render()
    {
        console.log(" Render Details view");
        return(
            <div className="m-2">
                <h3>Details</h3>
                <div className="list-group m-2">
                    <li className="list-group-item"><b>Email: </b>{this.state.user.user_email}</li>
                    <li className="list-group-item"><b>Postal Code: </b>{this.state.user.user_postal_code}</li>
                    <li className="list-group-item"><b>Status: </b>{this.state.user.user_status}</li>
                </div>
                <div className="d-flex flex-row">
                    <div className="m-2">
                        <Link className="btn btn-primary" to={ "/user/edit/" + this.state.user._id }>Edit</Link>
                    </div>
                    <div className="m-2">
                        <Link className="btn btn-primary" to={ "/user/confirm-delete/" + this.state.user._id }>Delete</Link>
                    </div>
                </div>
            </div>
        )
    }
}


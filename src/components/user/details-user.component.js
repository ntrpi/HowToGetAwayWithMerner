// This is the class we are going to extend.
import React, { Component } from 'react';
// Allows easy routing
import { Link } from 'react-router-dom';
// axios handles RESTful requests.
import axios from 'axios';

const User = props => (

    <div className="m-2">
        <h3>Details</h3>
        <div className="list-group m-2">
            <li className="list-group-item"><b>Email: </b>{props.user.user_email}</li>
            <li className="list-group-item"><b>Postal Code: </b>{props.user.user_postal_code}</li>
            <li className="list-group-item"><b>Status: </b>{props.user.user_status}</li>
            <li className="list-group-item">
                <b>            
                <Link to={ "/user/edit/" + props.user._id }>Edit</Link>
                </b>
             </li>
            <li className="list-group-item "><b>
            <Link to={ "/user/confirm-delete/" + props.user._id }>Delete</Link></b>
            </li>
        </div>        
    </div>
);

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
        axios.get( 'http://localhost:4000/users/' + this.state.userId )
        .then(response =>{
            //sets the user from this.setstate above
            this.setState({user:response.data})
        })
        //If it fails send an error
        .catch(function(error){
            console.log(error);
        });

    }
    UserDetails()
    {
        return <User user={this.state.user}/>;
    }
    
    render()
    {
        console.log(" Render Details view");
        return(
        <div>
            {this.UserDetails()};
        </div>
        )
    }
}


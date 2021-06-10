import React, { Component } from 'react';
import axios from 'axios';



export default class UserEdit extends Component
{
    constructor( props )
    {
        super( props );

        // I'm not entirely certain what this binding does, just that it is required
        // because the onChange methods affect the state object.
        this.onChangeUserPassword = this.onChangeUserPassword.bind( this );
        this.onChangeUserEmail = this.onChangeUserEmail.bind( this );
        this.onChangeUserPostalCode = this.onChangeUserPostalCode.bind( this );
        //ADDED FOR STATUS
        this.onChangeUserStatus = this.onChangeUserStatus.bind(this);
        // ADDED FOR STATUS
        this.onSubmit = this.onSubmit.bind( this );

        // I suspect this has something to do with the only way you can set member
        // variables in js.
        this.state = {
            user_password: '',
            user_email: '',
            user_postal_code: '',
            user_status: 'ACTIVE',
            user_errors:{
                user_password: '',
                user_email: '',
                user_postal_code: '', 
            }
        };
    }

    // The following onChange methods handle updates to those properties.
    // Note that the method for "completed" is missing.
    
    componentDidMount(){
        axios.get( 'http://localhost:4000/users/' + this.props.match.params.id )
        .then(response =>
            {
                this.setState({
                    user_password: response.data.user_password,
                    user_email: response.data.user_email,
                    user_postal_code: response.data.user_postal_code,
                    user_status: response.data.user_status,
                });
            })
            .catch(function(error) 
            {
                console.log(error);   
            });
    }
    
    
    onChangeUserPassword( e )
    {
        this.setState( {
            user_password: e.target.value
        } );
    }

    onChangeUserEmail( e )
    {
        this.setState( {
            user_email: e.target.value
        } );
    }

    onChangeUserPostalCode( e )
    {
        this.setState( {
            user_postal_code: e.target.value
        } );
    }

    onChangeUserStatus(e)
    {
        this.setState({
            user_status: e.target.value
        })
    }

    onSubmit( e )
    {
        //Validation
        // Prevent form reset, just like regular js.
        e.preventDefault();

        // Create an object to send in the post.
        const obj = {
            user_password: this.state.user_password,
            user_email: this.state.user_email,
            user_postal_code: this.state.user_postal_code,
            user_status: this.state.user_status
        };

        // Do the post.
        axios.post('http://localhost:4000/users/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        // Redirect to list page.
        this.props.history.push('/user/')
    }

    render()
    {
        console.log( "here" );
        return (
            <div style={ { marginTop: 10 } }>
                <h3>Update User Information</h3>
                <form onSubmit={ this.onSubmit }>

                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text"
                            className="form-control"
                            value={ this.state.user_email }
                            onChange={ this.onChangeUserEmail }
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={ this.state.user_password }
                            onChange={ this.onChangeUserPassword }
                        />
                    </div>
                    <div className="form-group">
                        <label>Postal Code: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={ this.state.user_postal_code }
                            onChange={ this.onChangeUserPostalCode }
                        />
                    </div>

                    <div className="form-group">
                        <label>Status</label>
                        <br/>
                        <select value={ this.state.user_status} onChange={ this.onChangeUserStatus } className="btn btn-secondary dropdown-toggle" >
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="FLAGGED">FLAGGED</option>
                            <option value="SUSPENDED">SUSPENDED</option>
                            <option value="CANCELED">CANCELED</option>

                        </select>
                    </div>
                    <div className="form-group m-2">
                        <input type="submit" value="update User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}
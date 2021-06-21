import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component
{
    constructor( props )
    {
        super( props );

        // I'm not entirely certain what this binding does, just that it is required
        // because the onChange methods affect the state object.
        this.onChangeUserPassword = this.onChangeUserPassword.bind( this );
        this.onChangeUserEmail = this.onChangeUserEmail.bind( this );
        this.onChangeUserPostalCode = this.onChangeUserPostalCode.bind( this );
        this.onSubmit = this.onSubmit.bind( this );

        // I suspect this has something to do with the only way you can set member
        // variables in js.
        this.state = {
            user_password: '',
            user_email: '',
            user_postal_code: '',
            user_status: 'ACTIVE',
            user_errors: {
                user_password: '',
                user_email: '',
                user_postal_code: '',
            }
        };
    }

    // The following onChange methods handle updates to those prop erties.
    // Note that the method for "completed" is missing.
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

    //Function for validating Email
    isValidEmail( email ) 
    {
      
        //Checks against NULL
        if( ( email === null ) || email === "" ) {
            return "Email required";
        }
        //Checks against regex
        if( !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test( email ) ) {
            return "Invalid Email";
        }
        return null;
    }

    //Function for validating password
    isValidPassword( password ) 
    {
        let comparePassword = document.getElementById( "password" ).value;
        //Checks for bull entry
        if( ( password === null ) || ( password === "" ) ) {
            return "Password required.";
        }
        //Checks length
        if( ( password.length < 7 ) || ( password === "" ) ) {
            return "Password must be at least 7 characters long";
        }
        //Checks that both passwords match
        if( !( password === comparePassword ) ) {
            return "Passwords do not match";
        }
        // Password is valid, return null.
        return null;
    }

    isValidPostalCode( postalCode ) 
    {
        //Checks against null
        if( ( postalCode === null ) || ( postalCode === "" ) ) {
            return "postalCode Required ";
        }
        //Checks against RegEx NOTE:CANADIAN POSTALCODE ONLY
        if( !/^[a-zA-Z]\d[a-zA-Z][ -]?\d[a-zA-Z]\d$/.test( postalCode ) ) {
            return "Must be a valid Canadian postal code";
        }
        return null;
    }

    onSubmit( e )
    {
        e.preventDefault();

        this.setState( {
            emailError: "",
            passwordError: "",
            postalCodeError: "",
        } );
        let emailResult = this.isValidEmail(this.state.user_email);
        if( emailResult !== null ) {
            this.setState( { emailError: emailResult} )
            return;
        }
        // Validate the Paswsword value.
        let passwordResult = this.isValidPassword( this.state.user_password );
        if( passwordResult !== null ) {
            this.setState( { passwordError: passwordResult } )
            return;
        }

        
        //Validate user PostalCode
        let postalCodeResult = this.isValidPostalCode(this.state.user_postal_code)
        if( postalCodeResult !== null )  {
            this.setState( { postalCodeError : postalCodeResult} )
            return;
        }


        // Create an object to send in the post.
        const newUser = {
            user_password: this.state.user_password,
            user_email: this.state.user_email,
            user_postal_code: this.state.user_postal_code,
            user_status: this.state.user_status
        };

        // Do the post.
        axios.post( '/users/add', newUser )
            .then(
                res => this.props.history.push( '/user/details/' + res.data.user._id )
            );

    }

    render()
    {
        return (
            <div style={ { marginTop: 10 } }>
                <h3>Create New User</h3>
                <form onSubmit={ this.onSubmit }>

                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email"
                            className="form-control"
                            value={ this.state.user_email }
                            onChange={ this.onChangeUserEmail }
                        />
                    </div>
                    <div style={ { fontSize: 12, color: "red" } }>
                        { this.state.emailError }
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input
                            type="password"
                            className="form-control"
                            value={ this.state.user_password }
                            onChange={ this.onChangeUserPassword }
                        />
                    </div>
                    <div style={ { fontSize: 12, color: "red" } }>
                        { this.state.passwordError }
                    </div>
                    <div className="form-group">
                        <label>Repeat Password: </label>
                        <input
                            type="password"
                            value={ this.state.check_password }

                            className="form-control"
                            id="password"
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
                    <div style={ { fontSize: 12, color: "red" } }>
                        { this.state.postalCodeError }
                    </div>
                    <div className="form-group m-2">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}
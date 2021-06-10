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

    // Return true if email is valid.
    isValidEmail( email ) 
    {
        let emailError = "";
        let reset = "";
        //Checks against REGEX
        if( ( email == null ) || email == "" ) {
            emailError = "Email required";
            this.setState( { emailError } );
            return false;

        }
        if( !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test( email ) ) {
            emailError = "Invalid Email";
            this.setState( { emailError } );
            return false;

        }

        else {
            emailError = " ";
            // if (emailError) {
            this.setState( { emailError } );

        }
        //If it does not pass set state of error mesage and return false


        //else return true
        return true;
    }

    // Password validation
    // Return null if the password is valid, otherwise return a message.
    isValidPassword( password ) 
    {
        let comparePassword = document.getElementById( "password" ).value;
        let PasswordError = "";

        //Checks against REGEX
        if( ( password == null ) || ( password == "" ) ) {
            return "Password required.";
        }
        if( ( password.length < 7 ) || ( password == "" ) ) {
            return "Password must be at least 7 characters long";
        }
        if( !( password == comparePassword ) ) {
            return "Passwords do not match";
        }

        // Password is valid, return null.
        return null;
    }

    isValidPostalCode( postalCode ) 
    {
        let postalCodeError = "";
        //Checks against null/regex
        if( ( postalCode == null ) || ( postalCode == "" ) ) {
            postalCodeError = "postalCode Required ";
            this.setState( { postalCodeError } );
            return false;
        }
        if( !/^[a-zA-Z]\d[a-zA-Z][ -]?\d[a-zA-Z]\d$/.test( postalCode ) ) {
            postalCodeError = "Must be a valid Canadian postal code";
            this.setState( { postalCodeError } );
            return false;
        }
        //If it does not pass set state of error mesage and return false
        else {
            postalCodeError = "  ";
            this.setState( { postalCodeError } );
        }
        //else return true
        return true;
    }

    onSubmit( e )
    {
        // Prevent form reset, just like regular js.
        e.preventDefault();

        this.setState( {
            emailError: "",
            passwordError: "",
            postalCodeError: "",
        } );

        // Validate the email value.
        let result = this.isValidEmail( this.state.user_email );
        if( result !== null ) {
            this.setState( { emailError: result } )
            return;
        }
        
        if( !this.isValidPassword( this.state.user_password ) ) {
            return;
        }
        if( !this.isValidPostalCode( this.state.user_postal_code ) ) {
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
        axios.post( 'http://localhost:4000/users/add', newUser )
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
                        <input type="text"
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
                            type="text"
                            className="form-control"
                            value={ this.state.user_password }
                            onChange={ this.onChangeUserPassword }
                        />
                    </div>
                    <div style={ { fontSize: 12, color: "red" } }>
                        { this.state.PasswordError }
                    </div>
                    <div className="form-group">
                        <label>Repeat Password: </label>
                        <input
                            type="text"
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
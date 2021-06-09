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
            user_errors:{
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

            //Check first for condition
            //IF NOT E.TARGE
            



        this.setState( {
            user_password: e.target.value
        } );
    }

    onChangeUserEmail( e )
    {
        if(!e.target.value.includes('@')){
            console.log('emailError'); 
            return 
        }
      
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
    validate=() =>{
        let passwordError = "";
        let emailError ="";
        let postalCodeError = "";
        // user_errors:{
        //     user_password: '',
            // user_email: 'TEST',
            // user_postal_code: '', 
        if (!this.state.user_email.includes('@')){
            emailError = 'invalid email'
            // return false
        }

        if (emailError){
            this.setState({emailError});
            return false
            } 
            return true           
    }

    onSubmit( e )
    {
        //Validation
        // Prevent form reset, just like regular js.
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
          console.log(this.state);
          // clear form
        //   this.setState(initialState);
        // For debugging.
        }
        // console.log( `Form submitted:` );
        // console.log( `User Email: ${ this.state.user_email }` );
        // console.log( `User Postal Code: ${ this.state.user_postal_code }` );

        // Create an object to send in the post.
        const newUser = {
            user_password: this.state.user_password,
            user_email: this.state.user_email,
            user_postal_code: this.state.user_postal_code,
            user_status: this.state.user_status
        };

        // Do the post.
        axios.post('http://localhost:4000/users/add', newUser)
            .then(res => console.log(res.data));

        // Manually reset the form.
        this.setState( {
            user_password: '',
            user_email: '',
            user_postal_code: '',
            //user_status: false
        } );
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
                    <div>{this.state.user_errors.user_email}</div>
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

                    <div className="form-group m-2">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}
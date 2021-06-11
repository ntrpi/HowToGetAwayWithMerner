import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//Maing the listings globally available
export default class ListingDetails extends Component
{
    constructor( props )
    {
        super( props );
        console.log(props);
    }

    render()
    {
        return (
            <div style={ { marginTop: 10 } }>
                <h3>Details</h3>
            </div>
        );
    }
};
import React, { Component } from 'react';
import axios from 'axios';

export default class CreateListing extends Component
{
    constructor( props )
    {
        super( props );
    }

    render()
    {
        return (
            <div style={ { marginTop: 10 } }>
                <h3>Create New Listing</h3>
            </div>
        );
    }
};
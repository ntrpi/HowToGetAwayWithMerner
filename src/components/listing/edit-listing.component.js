import React, { Component } from 'react';
import axios from 'axios';

export default class EditListing extends Component
{
    constructor( props )
    {
        super( props );
    }

    render()
    {
        return (
            <div style={ { marginTop: 10 } }>
                <h3>Update Listing</h3>
            </div>
        );
    }
};
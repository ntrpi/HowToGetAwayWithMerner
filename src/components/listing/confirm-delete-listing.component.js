import React, { Component } from 'react';
import axios from 'axios';

export default class ConfirmDeleteListing extends Component
{
    constructor( props )
    {
        super( props );
    }

    render()
    {
        return (
            <div style={ { marginTop: 10 } }>
                <h3>Delete Listing</h3>
            </div>
        );
    }
};
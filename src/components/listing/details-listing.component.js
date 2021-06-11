import React, { Component } from 'react';
import axios from 'axios';

export default class ListingDetails extends Component
{
    constructor( props )
    {
        super( props );
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
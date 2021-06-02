import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTodo extends Component
{

    constructor( props )
    {
        super( props );

        // I'm not entirely certain what this binding does, just that it is required
        // because the onChange methods affect the state object.
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind( this );
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind( this );
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind( this );
        this.onSubmit = this.onSubmit.bind( this );

        // I suspect this has something to do with the only way you can set member
        // variables in js.
        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        };
    }

    // The following onChange methods handle updates to those properties.
    // Note that the method for "completed" is missing.
    onChangeTodoDescription( e )
    {
        this.setState( {
            todo_description: e.target.value
        } );
    }

    onChangeTodoResponsible( e )
    {
        this.setState( {
            todo_responsible: e.target.value
        } );
    }

    onChangeTodoPriority( e )
    {
        this.setState( {
            todo_priority: e.target.value
        } );
    }

    onSubmit( e )
    {
        // Prevent form reset, just like regular js.
        e.preventDefault();

        // For debugging.
        console.log( `Form submitted:` );
        console.log( `Todo Description: ${ this.state.todo_description }` );
        console.log( `Todo Responsible: ${ this.state.todo_responsible }` );
        console.log( `Todo Priority: ${ this.state.todo_priority }` );

        // Create an object to send in the post.
        const newTodo = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };

        // Do the post.
        axios.post('http://localhost:4000/todos/add', newTodo)
            .then(res => console.log(res.data));

        // Manually reset the form.
        this.setState( {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        } );
    }

    render()
    {
        return (
            <div style={ { marginTop: 10 } }>
                <h3>Create New Todo</h3>
                <form onSubmit={ this.onSubmit }>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            className="form-control"
                            value={ this.state.todo_description }
                            onChange={ this.onChangeTodoDescription }
                        />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={ this.state.todo_responsible }
                            onChange={ this.onChangeTodoResponsible }
                        />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityLow"
                                value="Low"
                                checked={ this.state.todo_priority === 'Low' }
                                onChange={ this.onChangeTodoPriority }
                            />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityMedium"
                                value="Medium"
                                checked={ this.state.todo_priority === 'Medium' }
                                onChange={ this.onChangeTodoPriority }
                            />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityHigh"
                                value="High"
                                checked={ this.state.todo_priority === 'High' }
                                onChange={ this.onChangeTodoPriority }
                            />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}
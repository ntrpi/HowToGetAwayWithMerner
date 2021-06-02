// This is the class we are going to extend.
import React, { Component } from 'react';

// I guess this is another react component that we are going to use.
import { Link } from 'react-router-dom';

// axios handles RESTful requests.
import axios from 'axios';

// This creates a reusable component that is putting the properties
// of the todo into a row element.
// I'm not sure I understand the syntax here. If props is a parameter
// why is it props.todo when it is called with currentTodo below?
// Maybe the constructor wraps stuff passed to it with props?
const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
        <td>
            <Link to={ "/edit/" + props.todo._id }>Edit</Link>
        </td>
    </tr>
);

// Make this available to other stuff.
export default class TodosList extends Component
{

    constructor( props )
    {
        super( props );

        // Initialize the state with an empty array called todos.
        // We have to do this because it's the only way to have
        // member variables in a JS class.
        this.state = { todos: [] };
    }

    // Override this method to be called when the TodoList component is "mounted" successfully.
    componentDidMount()
    {
        // Access the default todos endpoint.
        axios.get( 'http://localhost:4000/todos/' )
            .then( response =>
            {
                // I'm guessing we got back an array of objects.
                // Replace the empty array we initialized the state with
                // with the response data.
                this.setState( { todos: response.data } );
            } )
            .catch( function( error )
            {
                console.log( error );
            } );
    }

    // This function maps each item in the array to the Todo component declared above.
    todoList()
    {
        return this.state.todos.map( function( currentTodo, i )
        {
            return <Todo todo={ currentTodo } key={ i } />;
        } );
    }

    // This is the one method you absolutely have to define when you extend Component.
    render()
    {
        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped" style={ { marginTop: 20 } } >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        );
    }
}
// I assume this is required for react.
import React, { Component } from "react";

// This is the react router package. Not sure why there
// are three different "as" things.
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// This is to use the bootstrap we installed.
import "bootstrap/dist/css/bootstrap.min.css";

// Each of these is a view, so component ~= view.
import CreateUser from "./components/user/create-user.component";
import UsersList from "./components/user/list-user.component";
// import ConfirmDeleteUser from "./components/user/confirm-delete-user.component";

import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";
import Navbar from "./components/navbar.component"

// Fixed this from .png in the tutorial.
import logo from "./logo.svg";

// This is a class instead of a function called App() like the 
// default code from this file, not sure why.
class App extends Component
{
  // I'm going to assume this takes the place of the App() function.
  render()
  {
    // This is here and in the default App() function, so I assume
    // this is how react delivers the html.
    return (

      // Wrap the JSX with the Router element.
      <Router>

        {/* Apparently this is JSX code. I don't know what that stands for
        just that it is clearly not straight JS. */}
        <div className="container">
          <Navbar />
          <br/>

          {/* These are endpoints that correspond with the imported .components above. Each .component file must have a corresponding class that extends Component that matches the component attribute here, so above we import CreateTodo from the component file, and here in the Route element we set the component attribute to {CreateTodo}. */}
          <Route path="/" exact component={TodosList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} />

          <Route path="/user/" exact component={UsersList} />
          <Route path="/user/create" exact component={CreateUser} />
          {/* <Route path="/user/confirm-delete/:id" exact component={ConfirmDeleteUser} /> */}
        </div>
      </Router>
    );
  }
}

// This was in the default code as well, so it's obviously necessary,
// but I don't know exactly what it does.
export default App;

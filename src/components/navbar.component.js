import React, { Component } from 'react';//import always
import { Link } from 'react-router-dom';//allow to link diff routes

import "../App.css";

//Navbar is the name of the component
export default class Navbar extends Component {//components always have to render something

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div>
        <Link to="/" className="navbar-brand m-lg-2">Ferns</Link>
        </div>
        <div className="collpase navbar-collapse ml-2">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/listing/create" className="nav-link">Sell Something</Link>
            </li>
            <li className="navbar-item">
              <Link to="/user/create" className="nav-link">Sign Up</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
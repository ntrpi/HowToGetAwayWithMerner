// I assume this is required for react.
import React, { Component } from "react";

// This is the react router package. Not sure why there
// are three different "as" things.
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

// This is to use the bootstrap we installed.
import "bootstrap/dist/css/bootstrap.min.css";

// User components.
import CreateUser from "./components/user/create-user.component";
import ListUsers from "./components/user/list-user.component";
import ConfirmDeleteUser from "./components/user/confirm-delete-user.component";
import UserDetails from "./components/user/details-user.component";
import EditUser from "./components/user/edit-user.component";

// Listing components.
import ListListings from "./components/listing/list-listing.component";
import CreateListing from "./components/listing/create-listing.component";
import ConfirmDeleteListing from "./components/listing/confirm-delete-listing.component";
import ListingDetails from "./components/listing/details-listing.component";
import EditListing from "./components/listing/edit-listing.component";

// General components.
import Navbar from "./components/navbar.component"

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

          {/* Listings Components */}
          <Route path="/" exact component={ListListings} />
          <Route path="/listing/create" exact component={CreateListing} />
          <Route path="/listing/confirm-delete/:id" exact component={ConfirmDeleteListing} />
          <Route path="/listing/details/:id" exact component={ListingDetails} />
          <Route path="/listing/edit/:id" exact component={EditListing} />

          {/* Users Components           */}
          <Route path="/user/" exact component={ListUsers} />
          <Route path="/user/create" exact component={CreateUser} />
          <Route path="/user/confirm-delete/:id" exact component={ConfirmDeleteUser} />
          <Route path="/user/details/:id" exact component={UserDetails} />
          <Route path="/user/edit/:id" exact component={EditUser} />
        </div>
      </Router>
    );
  }
}

// This was in the default code as well, so it's obviously necessary,
// but I don't know exactly what it does.
export default App;

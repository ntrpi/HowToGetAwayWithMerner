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

// Role components.
import CreateRole from "./components/role/create-role.component";
import ListRoles from "./components/role/list-role.component";
import ConfirmDeleteRole from "./components/role/confirm-delete-role.component";

// Image components.
import CreateImage from "./components/image/create-image.component";
import ListImages from "./components/image/list-image.component";
import ConfirmDeleteImage from "./components/image/confirm-delete-image.component";

// UserRole components.
import CreateUserRole from "./components/userRole/create-userRole.component";
import ListUserRoles from "./components/userRole/list-userRole.component";
import ConfirmDeleteUserRole from "./components/userRole/confirm-delete-userRole.component";

// ListingImage components.
import CreateListingImage from "./components/listingImage/create-listingImage.component";
import ListingImagesList from "./components/listingImage/list-listingImage.component";
import ConfirmDeleteListingImage from "./components/listingImage/confirm-delete-listingImage.component";

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
          <Route path="/listing" exact component={ListListings} />
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

          {/* Roles Components           */}
          <Route path="/role/" exact component={ListRoles} />
          <Route path="/role/create" exact component={CreateRole} />
          <Route path="/role/confirm-delete/:id" exact component={ConfirmDeleteRole} />

          {/* Images Components           */}
          <Route path="/image/" exact component={ListImages} />
          <Route path="/image/create" exact component={CreateImage} />
          <Route path="/image/confirm-delete/:id" exact component={ConfirmDeleteImage} />

          {/* UserRoles Components           */}
          <Route path="/userRole/" exact component={ListUserRoles} />
          <Route path="/userRole/create" exact component={CreateUserRole} />
          <Route path="/userRole/confirm-delete/:id" exact component={ConfirmDeleteUserRole} />

          {/* ListingImage Components           */}
          <Route path="/listingImage/" exact component={ListingImagesList} />

          {/* :id == listing id */}
          <Route path="/listingImage/create/:id" exact component={CreateListingImage} />

          <Route path="/listingImage/confirm-delete/:id" exact component={ConfirmDeleteListingImage} />
        </div>
      </Router>
    );
  }
}

// This was in the default code as well, so it's obviously necessary,
// but I don't know exactly what it does.
export default App;

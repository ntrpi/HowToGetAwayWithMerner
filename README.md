# MERN Todo App Tutorial

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li><a href="#about">About</a></li>
    <li>
      <a href="#part-1">Part 1</a>
      <ul>
        <li><a href="#create-and-start-the-app">Create and Start the App</a></li>
        <li><a href="#add-bootstrap">Add Bootstrap</a></li>
        <li><a href="#modify-app-file">Modify App File</a></li>
        <li><a href="#react-router">React Router</a></li>
        <li><a href="#components">Components</a></li>
      </ul>
    </li>
    <li>
      <a href="#part-2">Part 2</a>
      <ul>
        <li><a href="#initialize-the-back-end">Initialize the Back End</a></li>
      </ul>
    </li>
    <li><a href="#Deployment">Deployment</a></li>
  </ol>
</details>

## About

This project was created following the MERN tutorial here: https://codingthesmartway.com/the-mern-stack-tutorial-building-a-react-crud-application-from-start-to-finish-part-1/ on 2021-05-23

This file mostly contains my notes and anything I need to write down to help me figure out what I am learning.

## Part 1 Notes

### Create and Start the App

Use npx to create the react app:
```
npx create-react-app todo-app
```
Change to todo-app and start the development web server:
```
npm start
```
This will open a browser tab to localhost:3000 and show the default react app landing page.

** Note: this is running the unoptimized dev build. To create a production build run "npm run build".

### Add Bootstrap

Run the following command inside the project directory:
```
npm install bootstrap
```
It would seem that that command automatically adds bootstrap to package.json, although the stuff we installed for the back end needed the --save flag.

### Modify App File

See comments in src/App.js

### React Router

Install the package:
```
npm install react-router-dom
```

Not entirely clear on the router package, but seeing the routes in App.js, I'm assuming each route ~= a RESTful endpoint.

After adding the import .component statements, it would seem that each Route element is an endpoint, and each .component is a view.

### Components

See comments in App.js and the .component files.

## Part 2

### Initialize the Back End

I installed mongoose, but I didn't use it to create the database, only to access it afterwards. I created a db on Atlas, and used Mongo Client to insert stuff into it instead. Not sure now why I did this, except maybe I didn't want to deal with the whole mongoose schema thing right now.

<strong>If you are part of my 5303 group stop when you get to the Installing MondoDB section. This is where I deviated to use Atlas instead of a local instance of MongoDb. Check backend/server.js to see how it differs from the tutorial.

I used the Connecting To MongoDB By Using Mongoose section, but not the Create a Mongoose Schema section. </strong>

Also, the tutorial forgot to mention that you should probably add /backend/node_modules to .gitignore.


## Deployment

https://devcenter.heroku.com/articles/deploying-nodejs


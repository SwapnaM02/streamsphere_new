1. backend folder > npm init -y
2. npm install express jsonwebtoken mongoose cookie-parser dotenv axios bcrpt.js
3. The line const app = express(); is a crucial part of setting up an Express application. Here's a detailed explanation:

What it does:
Imports the Express module:

Before this line, you would typically have const express = require('express'); to import the Express module. This gives you access to the Express framework.

Creates an instance of an Express application:

express() is a function that, when called, creates and returns an Express application object (app). This object is the core of your Express application and is used to define routes, middleware, and other settings.

Stores the application object in the app variable:

The const app part declares a constant variable named app and assigns the Express application object to it. This app object is what you use to configure and run your server.

What is the app object?
The app object is an instance of an Express application. It has methods and properties that allow you to:

Define routes (e.g., app.get(), app.post()).

Use middleware (e.g., app.use()).

Start the server (e.g., app.listen()).

Configure settings (e.g., app.set()).


Registration: Store user data (hashed password, etc.) in the database.

Login: Generate and send JWT token to the client, who stores it.

No JWT Storage in DB: The server doesn't need to store the JWT token in the database because it is stateless. The client is responsible for storing and sending the token on future requests.


User data (e.g., username, hashed password, email, etc.) is stored in the database.

JWT is not stored anywhere on the server or in the database. It is only sent to the client after login, and the client is responsible for managing it securely.
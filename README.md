# where-is-everyone-backend

# Overview

This is the backend of the project. Created with MongoDB, Express, and Node.

# About the project the project

Photo tagging game that receives the coordinates on the characters from the frontend and validates them on the server, and depending on whether the character is found or not, it will change the marked property to true.
The server also checks if the game is done if all characters are found; otherwise, the user may refresh to start a new game or close and minimize the browser, which will not be able to end the game until the characters are found.

# Features

- Character validation on the characters to the backend
- Validation on the backend that checks when a game is done

# Technology Used

- MongoDB: creating models and relationships between users, characters, sessions, game, and leaderboard models
- Mongoose: that provides a schema-based solution for the application data
- Express: provides a robust set of features for web applications.
- Node: for allowing the use of modules, reading or writing for files
- MongoDB Memory Server: library that is used for testing the routes and controllers

# Lessons Learned

- Express Static: how to save the image URLs with the express static
- MongoDB relationships: how to make a better relationship with characters that have the reference to the game and not the other way around, which causes a problem.
- MongoDB nested models: that you can make nested object IDs in the model.
- Mongoose nested sorting: that you can sort the deeply populated models with Mongoose
- Mongoose Query: how to use the element position in the array with findByIdAndUpdate

# Future Improvements

- Test for creating new objects in the test
- How to utilize beforeAll and afterAll with the initializeMongoServer and end the test after it is completed instead of doing it manually.

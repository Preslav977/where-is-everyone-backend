# where-is-everyone-backend

1. This is the result of the Where's Everyone backend.

2. About the project the project.

- Photo tagging game that receives the coordinates on the characters from the frontend and validates them on the server, and depending on whether the character is found or not, it will change the marked property to true.
- The server also checks if the game is done if all characters are found; otherwise, the user may refresh to start a new game or close and minimize the browser, which will not be able to end the game until the characters are found.

3. Project objectives

- [x] game model that has image_link property to show an image, game_name property to specify the name of the game leaderboard reference to know which game has been played.
- [x] characters model that have a reference to the game, character_name for the their names, character_image for the their images, coordinates, and marked property, which is boolean
- [x] session model that has a reference to the game; characters array that contains object IDs of the characters; and marked property that is boolean. Start time property to know when a new game is started and end time to know when all characters are found to end the game.
- [x] leaderboard model that has reference to the user
- [x] user model with username property, score that is calculated from the date, and a date property
- [x] Game model routes and controller are responsible for the game that is created and fetched.
- [x] Character model routers and controllers are responsible for creating and fetching related to the game.
- [x] Session model routes and controllers are responsible for creating new games in the database; depending on whether all characters are found, it will add endTime in order to know if the game is done.
- [x] Leadeboard model routes and controllers is responsible for adding the user.
- [x] The user model routes and controller is responsible for creating the user
- [x] tested the routes and controllers with Postman.
- [x] tested every router and controller with the supertest

4. Notes and lessons learned

- I learned how to save the image URLs with the express static
- I learned how to make a better relationship with characters that have the reference to the game and not the other way around, which causes a problem.
- I learned that you can make nested object IDs in the model.
- I learned that you can sort the deeply populated models with mongoose.
- I learned how to use a map in Mongoose and return a copy of the object with changed properties instead of changing directly the properties of the character model.
- I learned how to use the element position in the array with findByIdAndUpdate.

5. Features or things I'd love to work on in the future

- [ ] Figure out how to test the newly created objects in the test using hardcoded ID.
- [ ] Figure out how to use beforeAll and afterAll to use the initializeMongoServer and end the test after it is completed instead of doing it manually.

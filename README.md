<img src="/client/src/assets/stonHeader.png" alt="Ston Recipe Notes">

### A platform for cooks and chefs.

Stön (stəʊn) is a platform built to help home cooks and chefs develop better recipes.

---

# Backend

---

## Technologies

TypeScript, Node, Express, MongoDB, Mongoose, JWT

## Features

The backend serves the frontend and has API routes for user registration and login as well as storing and retrieving pizzas.
It uses Mongoose to connect to MongoDB, and hashes password data into a JSON Web Token prior to storage.

---

# Frontend

---

## Technologies

JavaScript, React, React-Router, Redux-Toolkit, Axios

## Features

Login and registration forms are hooked into the global state and function as expected.
Global state is handled using Redux-Toolkit; the slices contains reducers, actions are dispatched from services to update the store.
React-Router is used to handle navigation, user will be redirected to home page while logged in and to login page while logged out.
Axios is used to make API fetch requests to the backend.

---

# Version Notes

## Current Release - 0.4a - 4/15/2023

  - Users can now search for recipes from the recipes page
    - Ability to search by name, author, ingredients, or recipe

## Version - 0.3a - 4/12/2023

 - Added ability for users to love recipes
    - Displays how many "loves" each recipe has
 - Added toast notifications for various success/error messages
 - Updated styles for a more consistent user experience


---

## Upcoming features - to be implemented soon

- Ability to add image(s) to recipe
    - Looking at Imagekit CDN

- Password reset functionality

- Email account verification for new accounts

- Sorting for recipes
  - Sort by rating
  - Show my recipes

- Settings page
  - Input to edit user profile
  - Delete account

- Add user profiles
  - Let user set a profile description and picture
  - Show user's recipes recipes on profile
  - Show loved recipes on profile
  - Add achievements and badges users can display on their profile

- Implement unit tests for basic features

- Add amounts for ingredients
  - Create a type interface for ingredients
    - { ingredient1: {ingredient, amount}, ... }

- Write up docs for the API

- Add a "share" button to the recipes
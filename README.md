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

## Current version - 0.3a - 4/12/2023

 - Added ability for users to love recipes
    - Displays how many "loves" each recipe has
 - Added toast notifications for various success/error messages
 - Updated styles for a more consistent user experience

---

## Upcoming features - to be implemented soon

- Add character limits for all input fields

- Ability to add image(s) to recipe
    - Looking at Imagekit CDN

- Password reset functionality

- Email account verification for new accounts

- Sort and search for browsing recipes
  - Search by name/user/ingredient
  - Sort by rating
  - Show my recipes

- Rating system
  - Save name/ID of recipe and rating in user data

- Settings page
  - Input to edit user profile
  - Delete account

- Add user profiles
  - Modal to display user profile
  - Make all instances of usernames a link to open the modal
  - Show created recipes on profile
  - Show rated recipes on profile

- Implement unit tests for basic features

- Add amounts for ingredients
  - Create a type interface for ingredients
    - { ingredient1: {ingredient, amount}, ... }

- Write up docs for the API

- Add a share button to make the card symmetrical again
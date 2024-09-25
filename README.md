# Recipe Sharing Website - Server (Backend)

This repository contains the backend for the Recipe Sharing Website. The backend is built with Node.js, Express.js, and MongoDB Atlas. It handles user authentication, authorization, and recipe management.

## Features

- Users can create, and delete recipes.
- Recipes are categorized into multiple categories.
- Authentication with JWT.
- Password hashing with bcryptjs.
- Database: MongoDB Atlas with Mongoose for data modeling.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server-side of the application.
- **Express.js**: Web framework for routing and handling requests.
- **MongoDB Atlas**: Cloud database for storing recipes and user data.
- **Mongoose**: ODM (Object Data Modeling) for interacting with MongoDB.
- **JWT**: JSON Web Token for user authentication and authorization.
- **bcryptjs**: Password hashing for securing user accounts.

## Installation

### Prerequisites

- Node.js (v14+)
- npm (Node Package Manager)
- MongoDB Atlas account

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Tami-Co/Server_side_recipe_project.git
2. **Install server dependencies**:
   ```bash
   cd server-side
   npm install
3. **Install client dependencies**:
   ```bash
   cd client-side
   npm install
4. **Environment variables:** Create a .env file in the server-side folder with the following content:
   ```bash
   PORT=<your-port>
   DB_URL=mongodb+srv://noaRe:nR6787661@mycluster.emynhxf.mongodb.net/recipe_siteDB?retryWrites=true&w=majority&appName=MyCluster
   BCRYPT_SALT=<your-bcrypt-salt>
   JWT_SECRET=<your-secret-key>
5. **Run the backend (server)**:
   ```bash
   npm run dev
5. **Run the frontend  (client)**:
   ```bash
   npm start

## Endpoints

## users resource

| url | method | description | permissions | parameters | optional parameters | body | headers | returns | status codes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [http://localhost:5000/users/](http://localhost:5000/users) | GET | get all users | administrator  |--- |---|---|token|all users| 200||||||
| [http://localhost:5000/users/signin](http://localhost:5000/users/signin) | POST | user sign ip |--- |--- |---|{email,password}	|---| User+token|204||||||
| [http://localhost:5000/users/signup](http://localhost:5000/users/signup) | POST | user sign up | --- |--- |---|{username,email,password,addres}	|---| User+token|204||||||
| [http://localhost:5000/users/:userId](http://localhost:5000/users/:userId)| GET | get user by id  |  administrator /current user | {userId} – קוד משתמש |---|---|token|User|200||||

## recipes resource

| url | method | description | permissions | parameters | optional parameters | body | headers | returns | status codes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [http://localhost:5000/recipes](http://localhost:5000/recipes) | GET | get all recipes | --- |---|perPage - מס' מתכונים לעמוד page - מס' עמוד search - חיפוש לפי שם מתכון|---|---| all recipes by sorted| 200|||||||
| [http://localhost:5000/:id](http://localhost:5000/recipes/:id) | GET |get recipe by id |---|{id} – קוד מתכון| --- |---|---|recipe by *id*|200|||||||
| [http://localhost:5000/recipes/recipesUser/:idUser](http://localhost:5000/recipes/recipesUser/:idUser) | GET | get recipes of user - by id of user |administrator /current user |{idUser} – קוד משתמש | --- |---|token|recipe by *user id*|200||||||| 
| [http://localhost:5000/recipes/recipesByTime/:time](http://localhost:5000/recipes/recipesByTime/:time) | GET | get recipes by preparation time |---|{time} –  זמן הכנה| --- |---|---|recipes by time|200|||||
| [http://localhost:5000/recipes](http://localhost:5000/recipes) | POST | add new course  |administrator /current user | ---|---|{ new recipe}|token|	new recipe added|204|  |||||||
| [http://localhost:5000/recipes/:id](http://localhost:5000/recipes/:id) | PUT | update existing recipe (by *id*) |administrator /current user |{id} – קוד מתכון| --- |{recipe}	|token|updated recipe|204||||| --- |||||||
| [http://localhost:5000/recipes/:id](http://localhost:5000/recipes/:id) | DELETE | delete existing recipe (by *id*) |administrator /current user |{id} – קוד מתכון| --- |---|token|---|204|||||

## categories resource

| url | method | description | permissions | parameters | optional parameters | body | headers | returns | status codes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [http://localhost:5000/categories](http://localhost:5000/categories) | GET | get all categories | --- |--- |---|---||all category|200|||||
| [http://localhost:5000/categories/withRecipes](http://localhost:5000/users/withRecipes) | GET | get all categories with their recipes | --- |---|--- |---|---|all category with recipes |200||||||
| [http://localhost:5000/categories/:name](http://localhost:5000/users/categories/:name) | GET | get category with her recipes by name of category |---|{name} –  שם קטגוריה| --- |---|---|category by name with recipes |200||||||









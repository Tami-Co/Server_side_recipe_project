# server Recipe

## Installation

### Before starting the server, make sure to install the necessary Node.js modules:

### npm install


## Environment Variables

Create a `.env` file in the root directory of your project and add the following environment variables:

| Variable     | Description                                                |
| ------------ | ---------------------------------------------------------- |
| DB_URL       | MongoDB connection URL for your database.                   |
| PORT         | Port number on which the server will run.                  |
| BCRYPT_SALT  | Number of salt rounds for bcrypt hashing.                   |
| JWT_SECRET   | Secret key used for signing JWT tokens.                    |



## Endpoints

## users resource

| url | method | description | permissions | parameters | optional parameters | body | headers | returns | status codes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [recipe-website-8t6p.onrender.com/users/](http://localhost:5000/users) | GET | get all users | administrator  |--- |---|---|token|all users| 200||||||
| [recipe-website-8t6p.onrender.com/users/signin](http://localhost:5000/users/signin) | POST | user sign ip |--- |--- |---|{email,password}	|---| User+token|204||||||
| [recipe-website-8t6p.onrender.com/users/signup](http://localhost:5000/users/signup) | POST | user sign up | --- |--- |---|{username,email,password,addres}	|---| User+token|204||||||
| [recipe-website-8t6p.onrender.com/:userId](http://localhost:5000/users/:userId)| GET | get user by id  |  administrator /current user | {userId} – קוד משתמש |---|---|token|User|200||||

## recipes resource

| url | method | description | permissions | parameters | optional parameters | body | headers | returns | status codes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [recipe-website-8t6p.onrender.com/recipes](http://localhost:5000/recipes) | GET | get all recipes | --- |---|perPage - מס' מתכונים לעמוד page - מס' עמוד search - חיפוש לפי שם מתכון|---|---| all recipes by sorted| 200|||||||
| [recipe-website-8t6p.onrender.com/:id](http://localhost:5000/recipes/:id) | GET |get recipe by id |---|{id} – קוד מתכון| --- |---|---|recipe by *id*|200|||||||
| [recipe-website-8t6p.onrender.com/recipes/recipesUser/:idUser](http://localhost:5000/recipes/recipesUser/:idUser) | GET | get recipes of user - by id of user |administrator /current user |{idUser} – קוד משתמש | --- |---|token|recipe by *user id*|200||||||| 
| [recipe-website-8t6p.onrender.com/recipes/recipesByTime/:time](http://localhost:5000/recipes/recipesByTime/:time) | GET | get recipes by preparation time |---|{time} –  זמן הכנה| --- |---|---|recipes by time|200|||||
| [recipe-website-8t6p.onrender.com/recipes](http://localhost:5000/recipes) | POST | add new course  |administrator /current user | ---|---|{ new recipe}|token|	new recipe added|204|  |||||||
| [recipe-website-8t6p.onrender.com/recipes/:id](http://localhost:5000/recipes/:id) | PUT | update existing recipe (by *id*) |administrator /current user |{id} – קוד מתכון| --- |{recipe}	|token|updated recipe|204||||| --- |||||||
| [recipe-website-8t6p.onrender.com/recipes/:id](http://localhost:5000/recipes/:id) | DELETE | delete existing recipe (by *id*) |administrator /current user |{id} – קוד מתכון| --- |---|token|---|204|||||

## categories resource

| url | method | description | permissions | parameters | optional parameters | body | headers | returns | status codes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [recipe-website-8t6p.onrender.com/categories](http://localhost:5000/categories) | GET | get all categories | --- |--- |---|---||all category|200|||||
| [recipe-website-8t6p.onrender.com/categories/withRecipes](http://localhost:5000/users/withRecipes) | GET | get all categories with their recipes | --- |---|--- |---|---|all category with recipes |200||||||
| [recipe-website-8t6p.onrender.com/categories/:name](http://localhost:5000/users/categories/:name) | GET | get category with her recipes by name of category |---|{name} –  שם קטגוריה| --- |---|---|category by name with recipes |200||||||









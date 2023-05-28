/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomeController.index');

Route.get('/signup', async ({ view }) => {
  return view.render('auth/signup')
}).middleware('guest')
Route.post('/signup', 'AuthController.signup');

Route.get('/login', async ({ view }) => {
  return view.render('auth/login')
}).middleware('guest')

Route.post('/login', 'AuthController.login');

Route.post('/logout', 'AuthController.logout');

Route.get('/posts/create', 'PostsController.create')
Route.post('/posts/create', 'PostsController.store').middleware('auth')

Route.post('/follow/:userid', 'FollowsController.store').middleware('auth')
Route.delete('/follow/:userid', 'FollowsController.destroy').middleware('auth')

Route.get('/:username', 'ProfilesController.index').middleware('auth')
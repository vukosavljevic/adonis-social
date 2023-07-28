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

Route.get('/', 'HomeController.welcome')
Route.get('/feed', 'HomeController.index')
Route.get('/jobs/publish','JobsController.page')
Route.get('/discover', 'ProfilesController.show')

Route.get('/login', async ({ view }) => {
  return view.render('auth/login')
}).middleware('guest')
Route.post('/signup', 'AuthController.signup')
Route.post('/login', 'AuthController.login')

Route.get('/jobs', 'JobsController.index')
Route.get('/signup', async ({ view }) => {
  return view.render('auth/signup')
}).middleware('guest')

// SOCIAL LOGIN
Route.get('/google/redirect', async ({ ally }) => {
  return ally.use('google').redirect()
})
Route.get('/google','AuthController.google')

Route.post('/logout', 'AuthController.logout')

Route.post('/like/:postid', 'LikesController.increment')
Route.delete('/dislike/:postid', 'LikesController.reduce')


Route.get('/posts', 'PostsController.index')
Route.delete('/posts/:id', 'PostsController.destroy')
Route.post('/posts/update/:id','PostsController.update').middleware('auth')
Route.get('/posts/create', 'PostsController.create').middleware('auth')
Route.post('/posts/create', 'PostsController.store').middleware('auth')

Route.get('/follow', 'FollowsController.index')
Route.get('/followings', 'FollowsController.show')
Route.post('/follow/:userid', 'FollowsController.store').middleware('auth')
Route.delete('/follow/:deleteid', 'FollowsController.destroy').middleware('auth')

Route.get('/profile/edit','ProfilesController.edit').middleware('auth')
Route.post('/profile/edit','ProfilesController.update').middleware('auth')
Route.delete('/profile/delete','ProfilesController.delete').middleware('auth')
Route.get('/:username', 'ProfilesController.index').middleware('auth')


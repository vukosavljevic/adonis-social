import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class ProfilesController {
  public async index({ auth, view, params }: HttpContextContract) {
    const username = params.username;
    const user = await User.findBy('username', username)

    if (!user) {
      return view.render('errors.not-found')
    }
    await user.load('posts')
    await auth.user.load('followings')

    return view.render('profile', { user })
  }
  public async edit({ view }: HttpContextContract) {
    return view.render('accounts/edit')
  }
  public async update({ response, auth, request }: HttpContextContract) {
    const user = auth.user;
    const ime = request.input(['username']);
    user.username = ime;
    await user.save();
    return response.redirect(`/${ime}`)
  }
  public async delete({ response,auth }: HttpContextContract){
    const user = auth.user;
    await user.delete()
    return response.redirect('/login')
  }
}

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Following from 'App/Models/Following';
import Post from 'App/Models/Post';
import User from 'App/Models/User';

export default class ProfilesController {
  public async index({ auth, view, params }: HttpContextContract) {
    const username = params.username;
    const user = await User.findBy('username', username)

    if (!user) {
      return view.render('errors.not-found')
    }
    await user.load('posts')
    await auth.user?.load('followings')
    const followings = auth.user?.followings.map(f => f.followingId)
    //neradi za loadanje prijatelja
    const follows = await User.query().whereIn('id', followings);
    return view.render('profile', { user,follows })
  }
  public async show({ view }: HttpContextContract){
    const users = await User.query();
    return view.render('accounts/show', { users })
  }
  public async edit({ view }: HttpContextContract) {
    return view.render('accounts/edit')
  }
  public async update({ response, auth, request }: HttpContextContract) {
    const user = auth.user;
    const ime = request.input(['username']);
    const opis = request.input(['description'])
    user.username = ime;
    user.description = opis;
    await user.save();
    return response.redirect(`/${ime}`)
  }
  public async delete({ response,auth }: HttpContextContract){
    const user = auth.user;
    const post = Post.query().where('user_id', auth.user.id);
    await post.delete()
    await user.delete()
    return response.redirect('/login')
  }
}

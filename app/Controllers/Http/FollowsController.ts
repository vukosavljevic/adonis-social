import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Following from 'App/Models/Following'
import User from 'App/Models/User';

export default class FollowsController {
  public async index() {
    const following = await Following.query()
    return following;
  }
  public async show({ auth, view }: HttpContextContract) {
    await auth.user?.load('followings')
    const followings = auth.user?.followings.map(f => f.followingId)
    //neradi za loadanje prijatelja
    const follows = await User.query().whereIn('id', followings);
    return view.render('followings', { follows });
  }
  public async store({ auth, params, response }: HttpContextContract) {
    const follow = new Following()
    follow.userId = auth.user.id;
    follow.followingId = params.userid;
    await follow.save();
    return response.redirect().back()
  }
  public async destroy({ response, auth, params }: HttpContextContract) {
    const follow = Following.query().where('user_id', auth.user.id).where('following_id', params.deleteid)
    await follow.delete()
    return response.redirect().back()
  }
}

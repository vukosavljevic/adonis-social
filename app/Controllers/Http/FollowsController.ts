import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Following from 'App/Models/Following'

export default class FollowsController {
  public async store({ auth, params, response }: HttpContextContract) {

    const follow = new Following()
    follow.userId = auth.user.id;
    follow.followingId = params.userid;
    await follow.save();
    return response.redirect().back()
  }
  public async destroy({ auth, params }: HttpContextContract) {
    const follow = Following.query().where('user_id',auth.user.id).where('following_id',params.userid)
    await follow.delete()
  }
}

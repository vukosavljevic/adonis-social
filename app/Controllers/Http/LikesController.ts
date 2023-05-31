import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Like from 'App/Models/Like'

export default class LikesController {
  public async show({ }: HttpContextContract) {

  }
  public async increment({ response, params, auth }: HttpContextContract) {
    const alreadyLiked = await Like.query().where('post_id', params.postid).andWhere('user_id',auth.user.id);
    if (alreadyLiked.length > 0) {
      return response.redirect().back()
    }
    else {
      const liked = new Like()
      liked.userId = auth.user.id
      liked.postId = params.postid
      await liked.save()
      return response.redirect().back()
    }
  }
  public async reduce({ response, auth, params }: HttpContextContract) {
    const reduced = Like.query().where('post_id', params.postid).andWhere('user_id',auth.user.id);
    await reduced.delete()
    return response.redirect().back()
  }
}

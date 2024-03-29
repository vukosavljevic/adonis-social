import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class HomeController {
  public async index({ view }: HttpContextContract) {
    const posts = await Post
      .query()
      .preload('user').preload('likes');
    return view.render('feed', { posts })
  }
  public async welcome({view} : HttpContextContract){
    return view.render('welcome')
  }
}

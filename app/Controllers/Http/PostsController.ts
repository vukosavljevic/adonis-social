import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator';
import Post from 'App/Models/Post'

export default class PostsController {
  public async index() {
    const posts = await Post.query()
    return posts;
  }
  public async create({ view }: HttpContextContract) {
    return view.render('posts/create')
  }
  public async store({ request, response, auth }: HttpContextContract) {
    const req = await request.validate({
      schema: schema.create({
        caption: schema.string(),
        image: schema.file({
          size: '2mb',
          extnames: ['jpg', 'png', 'jpeg']
        })
      }
      ),
      messages: {
        'caption.required': 'Caption is required to sign up',
        'image.required': 'Image is required to sign up'
      }
    })

    const imageName = new Date().getTime().toString() + `.${req.image.extname}`
    await req.image.move(Application.publicPath('images'), {
      name: imageName
    })
    const post = new Post()
    post.image = `images/${imageName}`
    post.caption = req.caption
    post.userId = auth.user.id

    await post.save()

    return response.redirect(`/${auth.user?.username}`)
  }
  public async destroy({ response, params }: HttpContextContract) {
    const post = Post.query().where('id', params.id);
    await post.delete()
    return response.redirect().back()
  }
  public async like({ }: HttpContextContract) {

  }
}

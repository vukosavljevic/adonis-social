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
        video: schema.string.optional(),
        image: schema.file.optional({
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
    const post = new Post()
    if(req.image){
      const imageName = new Date().getTime().toString() + `.${req.image.extname}`
      await req.image.move(Application.publicPath('images'), {
        name: imageName
      });
      post.image = `images/${imageName}`
    }
    post.caption = req.caption
    post.userId = auth.user.id
    if(req.video){
      post.video = req.video
    }
    await post.save()

    return response.redirect(`/${auth.user?.username}`)
  }
  public async update({ request, params }: HttpContextContract) {
    const postId = params.id
    const post = await Post.findOrFail(postId)
    const req = await request.validate({
      schema: schema.create({
        caption: schema.string.optional(),
        image: schema.file.optional({
          size: '2mb',
          extnames: ['jpg', 'png', 'jpeg']
        })
      }),
      messages: {
        'caption.required': 'Caption is required',
        'image.required': 'Image is required'
      }
    });
    if (req.caption) {
      post.caption = req.caption;
    }
    if (req.image) {
      const imageName = new Date().getTime().toString() + `.${req.image.extname}`;
      await req.image.move(Application.publicPath('images'), {
        name: imageName,
        overwrite: true // Overwrite the existing image
      });
      post.image = `images/${imageName}`;
    }
    await post.save();
  }
  public async destroy({ response, params }: HttpContextContract) {
    const post = Post.query().where('id', params.id);
    await post.delete()
    return response.redirect().back()
  }
}

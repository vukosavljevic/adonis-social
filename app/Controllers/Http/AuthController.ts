import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import User from 'App/Models/User';

export default class AuthController {
  public async signup({ request, response }: HttpContextContract) {
    const req = await request.validate({
      schema: schema.create({
        name: schema.string(),
        email: schema.string({}, [
          rules.email(),
        ]),
        username: schema.string({}),
        password: schema.string({})
      }
      ),
      messages: {
        'name.required': 'Name is required to sign up',
        'email.required': 'Email is required to sign up',
        'username.required': 'Username is required to sign up',
        'password.required': 'Password is required to sign up',
      }
    })

    const user = new User();
    user.name = req.name;
    user.email = req.email;
    user.password = req.password;
    user.username = req.username;
    await user.save();
    return response.redirect('/profile')
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const req = await request.validate({
      schema: schema.create({
        email: schema.string({}, [
          rules.email()
        ]),
        password: schema.string([
          rules.minLength(8)
        ])
      }),
      messages: {
        'email.required': 'Email is required to sign up',
        'password.required': 'Password is required to sign up',
        'password.minLength': 'Password must be at least 8 characters',
      }
    })

    const email = req.email;
    const password = req.password;

    try {
      const user = await auth.use('web').attempt(email, password)
      return response.redirect(`/${user.username}`)
    }
    catch {
      return response.badRequest('Invalid credentials')
    }
  }

  public async logout({response,auth}: HttpContextContract) {
    await auth.logout();
    return response.redirect('/')
  }
}

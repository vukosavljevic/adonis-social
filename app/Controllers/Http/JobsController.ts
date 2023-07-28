import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class JobsController {
  public async index({ view }: HttpContextContract) {
    return view.render('jobs')
  }
  public async page({view}){
    return view.render('jobs/create')
  }
}

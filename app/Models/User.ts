import { DateTime } from 'luxon'
import { BaseModel, HasMany, beforeSave, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Post from './Post'
import Following from './Following'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public avatar: string

  @column()
  public details: string

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public password: string

  @hasMany(() => Post)
  public posts: HasMany<typeof Post>

  @hasMany(() => Following)
  public followings: HasMany<typeof Following>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}




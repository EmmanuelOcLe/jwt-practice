import DBlocal from 'db-local'
import { User } from './userSchema.js'
import crypto from 'node:crypto'
import bcrypt from 'bcrypt'

const { Schema } = new DBlocal({ path: './db' })

const dbUser = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
})

export class UserModel {
  static Register ({ username, password }) {
    const validData = User.safeParse({ username, password })

    if (!validData.success) throw new Error('Invalid input')

    const userExists = dbUser.findOne({ username })
    if (userExists) throw new Error('username already exists')

    const id = crypto.randomUUID()
    const hashedPassword = bcrypt.hashSync(password, 10)

    dbUser.create({
      _id: id,
      username,
      password: hashedPassword
    }).save()

    return id
  }

  static Login ({ username, password }) {
    const validData = User.safeParse({ username, password })

    if (!validData.success) throw new Error('Invalid Input')

    const userExists = dbUser.findOne({ username })
    if (!userExists) throw new Error('User does not exist.')

    const isValid = bcrypt.compareSync(password, userExists.password)
    if (!isValid) throw new Error('Password is not valid')

    const { password: _, ...publicUser } = userExists

    return publicUser
  }
}

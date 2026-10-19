import express from 'express'
import cookieParser from 'cookie-parser'
// import jwt from 'jsonwebtoken'
import { UserModel } from './UserModel.js'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('<h1>Hola, mundo</h1>')
})

app.post('/register', (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).send({
      message: 'username or password not provided',
      error: true
    })
  }

  try {
    const id = UserModel.Register({ username, password })

    res.status(201).send({
      error: null,
      message: 'User created successfully',
      id
    })
  } catch (error) {
    res.status(400).send({
      error: true,
      message: error.message
    })
  }
})

app.post('/login', (req, res) => {
  const body = req.body

  console.log(body)

  res.send('OK')
})

app.use((req, res) => {
  res.send('<h1>404 Not found</h1>')
})

app.listen(3000, () => {
  console.log('Server listening on port http://localhost:3000')
})

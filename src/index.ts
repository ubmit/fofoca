import * as express from 'express'
import * as socketio from 'socket.io'
import * as http from 'http'
import * as path from 'path'

const Filter = require('bad-words')

import { Location, User } from './typings'
import { generateMessage, generateLocationMessage } from './utils/messages'
import { addUser, removeUser, getUser, getUsersInRoom } from './utils/users'

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.json())
app.use(express.static(publicDirectoryPath))

io.on('connection', (socket: socketio.Socket) => {
  console.log('New WebSocket connection')

  socket.on('join', ({ username, room }, callback) => {
    const { error, user } = addUser({
      id: socket.id,
      username,
      room
    })

    if (error) {
      return callback(error)
    }

    if (user) {
      socket.join(user.room)

      socket.emit('message', generateMessage('Welcome'))

      socket.broadcast
        .to(user.room)
        .emit('message', generateMessage(`${user.username} has joined`))

      callback()
    }
  })

  socket.on('sendMessage', (message: string, callback) => {
    const filter = new Filter()

    if (filter.isProfane(message)) {
      return callback('Profanity is not allowed')
    }

    io.emit('message', generateMessage(message))

    callback()
  })

  socket.on('sendLocation', ({ longitude, latitude }: Location, callback) => {
    const locationUrl = `https://google.com/maps?q=${latitude},${longitude}`

    io.emit('locationMessage', generateLocationMessage(locationUrl))

    callback()
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    if (user) {
      io.to(user.room).emit(
        'message',
        generateMessage(`${user.username} has left!`)
      )
    }
  })
})

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})

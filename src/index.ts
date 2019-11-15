import * as express from 'express'
import * as socketio from 'socket.io'
import * as http from 'http'
import * as path from 'path'

import { Location } from './typings'

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.json())
app.use(express.static(publicDirectoryPath))

io.on('connection', (socket: socketio.Socket) => {
  console.log('New WebSocket connection')

  socket.emit('message', 'Welcome!')
  socket.broadcast.emit('message', 'A new user has joined!')

  socket.on('sendMessage', (message: string) => {
    io.emit('message', message)
  })

  socket.on('sendLocation', ({ longitude, latitude }: Location) => {
    io.emit('message', `https://google.com/maps?q=${latitude},${longitude}`)
  })

  socket.on('disconnect', () => {
    io.emit('message', 'A user has left!')
  })
})

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})

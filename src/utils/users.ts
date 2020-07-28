import { User } from '../typings'

const users: User[] = []

export const addUser = ({ id, username, room }: User) => {
  const formattedUsername = username.trim().toLowerCase()
  const formattedRoom = room.trim().toLowerCase()

  if (!formattedUsername || !formattedRoom) {
    return {
      error: 'Username and room are required!'
    }
  }

  const existingUser = users.find(
    user => user.room == formattedRoom && user.username == formattedUsername
  )

  if (existingUser) {
    return {
      error: 'Username is in use!'
    }
  }

  const user = {
    id,
    username: formattedUsername,
    room: formattedRoom
  }

  users.push(user)

  return { user }
}

export const removeUser = (id: string) => {
  const userIndex = users.findIndex(user => user.id === id)

  if (userIndex === -1) {
    return undefined
  }

  const removedUser = users.splice(userIndex, 1)[0]

  return removedUser
}

export const getUser = (id: string) => users.find(user => user.id === id)

export const getUsersInRoom = (room: string) =>
  users.filter(user => user.room === room)

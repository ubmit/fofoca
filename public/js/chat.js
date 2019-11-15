const socket = io()

socket.on('message', message => {
  console.log(message)
})

function handleSubmit(e) {
  e.preventDefault()

  const message = e.target.elements.message.value

  socket.emit('sendMessage', message)
}

document.querySelector('form').addEventListener('submit', handleSubmit)

document.getElementById('send-location').addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser')
  }

  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords

    socket.emit('sendLocation', { latitude, longitude })
  })
})

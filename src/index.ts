import * as express from 'express'

const PORT = 3000 || process.env.PORT

const app = express()

app.use(express.json())

app.get('/', (_req, res) => {
  res.send('hello!')
})

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`)
})

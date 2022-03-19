import express, { Request, Response } from 'express'
import 'dotenv/config'
import path from 'path'

const app = express()
const PORT: any = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, './../src/views')))

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, './../src/views/index.html'))
})

app.get('/fighter/:name', (req: Request, res: Response) => {
  const { name } = req.params

  res.send(name)
})

app.listen(PORT, () => {
  console.log(`listening in on port: ${PORT}`)
})
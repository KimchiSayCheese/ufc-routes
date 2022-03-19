import express, { Request, Response } from 'express'
import 'dotenv/config'
import path from 'path'
import { PrismaClient, Prisma } from '@prisma/client'

const app = express()
const PORT: any = process.env.PORT || 4004
const prisma = new PrismaClient()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, './../src/views')))
app.use(
  '/favicon.ico',
  express.static(path.join(__dirname, './../src/views/favicon.ico'))
)


// Home Page (Not the focus of this project.)

app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, './../src/views/index.html'))
})ß



// CRUD Operations

app.get('/fighter/:name', async (req: Request, res: Response) => {
  const { name } = req.params
  const fighterFindManyArg: Prisma.FighterFindManyArgs = {
    where: {
      name: {
        contains: name
      }
    }
  }
  const data = await prisma.fighter.findMany(fighterFindManyArg)
  res.send(data)
})

app.listen(process.env.PORT, () => {
  console.log(`listening in on port: ${process.env.PORT}`)
})

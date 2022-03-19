import { PrismaClient, Prisma, Fight } from '@prisma/client'
import fs from 'fs'
import path from 'path'
type options = {
  [key: string]: string
}
const months: options = {
  Jan: '01',
  Feb: '02',
  Mar: '03',
  Apr: '04',
  May: '05',
  Jun: '06',
  Jul: '07',
  Aug: '08',
  Sep: '09',
  Oct: '10',
  Nov: '11',
  Dec: '12'
}

const prisma = new PrismaClient()
const main = async () => {
  const dataArr = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../fighterJSON.json'), 'utf-8')
  )
  let fighter: Prisma.FighterCreateInput

  for (let i = 0; i < dataArr.length; i++) {
    let data = dataArr[i]
    let fights = data.history

    fighter = {
      name: data.name,
      nick_name: data.nickName,
      age: data.age,
      height: data.height,
      weight: data.weight,
      weight_class: data.weightClass,
      association: data.association,
      image: data.image,
      wins: {
        create: {
          total_wins: parseInt(data.wins.totalWin),
          win_by_kos: parseInt(data.wins.winByKOs),
          win_by_submissions: parseInt(data.wins.winBySubmissions),
          win_by_decisions: parseInt(data.wins.winByDecisions)
        }
      },
      loses: {
        create: {
          total_loses: parseInt(data.loses.totalLoss),
          lose_by_kos: parseInt(data.loses.loseByKOs),
          lose_by_submissions: parseInt(data.loses.lossBySubmissions),
          lose_by_decisions: parseInt(data.loses.loseByDecisions)
        }
      }
    }

    let createFighter = await prisma.fighter.create({ data: fighter })

    let result: Prisma.FightCreateManyInput[] = []
    console.log(dataArr[i].name, fights)

    for (let j = 0; j < fights.length; j++) {
      let dateArr = fights[j].date.split('/')
      let date = `${
        months[dateArr[0].toString().trim()]
      } / ${dateArr[1].trim()} / ${dateArr[2].trim()}`
      // console.log(`${createFighter.name} ::: ${date}`)

      result.push({
        fighter_id: createFighter.id,
        opponent_name: fights[j].opponent,
        event: fights[j].event,
        date: date,
        result: fights[j].result,
        decision: fights[j].decision,
        round: parseInt(fights[j].round),
        time: fights[j].time
      })
    }
    let createFights = await prisma.fight.createMany({ data: result })
    result = []
  }
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

import { Day1PartOne, Day1PartTwo } from './days/1'
import { day2partOne, day2partTwo } from './days/2/index.'

async function main(day: number) {
  switch (day) {
    case 1: {
      console.log('Day One: Trebuchet')
      await Day1PartOne()
      await Day1PartTwo()
      break
    }
    case 2: {
      console.log('Day Two: Cube conundrum')
      await day2partOne()
      await day2partTwo()
      break
    }
    default: {
      console.log(`Day ${day} solution not found`)
    }
  }

  console.log('Finished.')
  process.exit(0)
}

const [_, __, day] = process.argv

if (!day || isNaN(parseInt(day))) {
  console.log('Usage: npm start <day>')
  process.exit(1)
}

main(parseInt(day))

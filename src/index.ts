import { Day1PartOne, Day1PartTwo } from './days/1'

async function main(day: number) {
  switch (day) {
    case 1: {
      console.log('Day One: Trebuchet')
      await Day1PartOne()
      await Day1PartTwo()
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

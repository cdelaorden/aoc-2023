import { Day1PartOne, Day1PartTwo } from './days/1'
import { day2partOne, day2partTwo } from './days/2/index.'
import { day3partOne, day3partTwo } from './days/3'
import { day4partOne, day4partTwo } from './days/4'
import { day5partOne, day5partTwo } from './days/5'
import { readInput, readSample } from './lib/fs'

async function main(day: number) {
  const sample = await readSample(day)
  const input = await readInput(day)
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
    case 3: {
      console.log('Day 3: Gear ratios')
      await day3partOne()
      await day3partTwo()
      break
    }
    case 4: {
      day4partOne(sample, input)
      day4partTwo(sample, input)
      break
    }
    case 5: {
      day5partOne(sample, input)
      day5partTwo(sample, input)
      break
    }
    default: {
      console.log(`Day ${day} solution not found`)
    }
  }

  console.log('Finished.')
  process.exit(0)
}

const day = process.argv.at(2)

if (!day || isNaN(parseInt(day))) {
  console.log('Usage: npm start <day>')
  process.exit(1)
}

main(parseInt(day))

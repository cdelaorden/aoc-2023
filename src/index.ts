import { performance } from 'perf_hooks'
import { Day1PartOne, Day1PartTwo } from './days/1'
import { day10PartOne, day10PartTwo } from './days/10'
import { day11PartOne, day11PartTwo } from './days/11'
import { day12PartOne, day12PartTwo } from './days/12'
import { day2partOne, day2partTwo } from './days/2/index.'
import { day3partOne, day3partTwo } from './days/3'
import { day4partOne, day4partTwo } from './days/4'
import { day5partOne, day5partTwoPool } from './days/5'
import { day6partOne, day6partTwo } from './days/6'
import { day7PartOne, day7PartTwo } from './days/7'
import { day8PartOne, day8PartTwo } from './days/8'
import { day9PartOne, day9PartTwo } from './days/9'
import { readInput, readSample } from './lib/fs'

async function main(day: number) {
  const sample = await readSample(day)
  const input = await readInput(day)
  const start = performance.now()
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
      console.log('Day 4')
      day4partOne(sample, input)
      day4partTwo(sample, input)
      break
    }
    case 5: {
      console.log('Day 5')
      day5partOne(sample, input)
      await day5partTwoPool(sample, input)
      break
    }
    case 6: {
      console.log('Day 6')
      day6partOne(sample, input)
      day6partTwo(sample, input)
      break
    }
    case 7: {
      console.log('Day 7')
      day7PartOne(sample, input)
      day7PartTwo(sample, input)
      break
    }
    case 8: {
      console.log('Day 8')
      day8PartOne(sample, input)
      day8PartTwo(sample, input)
      break
    }
    case 9: {
      console.log('Day 9')
      day9PartOne(sample, input)
      day9PartTwo(sample, input)
      break
    }
    case 10: {
      console.log('Day 10: Pipe Maze')
      console.log('-----------------')
      day10PartOne(sample, input)
      day10PartTwo(sample, input)
      break
    }
    case 11: {
      console.log('Day 11: Cosmic Expansion')
      console.log('------------------------')
      day11PartOne(sample, input)
      day11PartTwo(sample, input)
      break
    }
    case 12: {
      console.log('Day 12: Hot Springs')
      console.log('-------------------')
      day12PartOne(sample, input)
      day12PartTwo(sample, input)
      break
    }
    default: {
      console.log(`Day ${day} solution not found`)
    }
  }

  console.log('Finished in %s ms.', (performance.now() - start).toFixed(2))
  process.exit(0)
}

const day = process.argv.at(2)

if (!day || isNaN(parseInt(day))) {
  console.log('Usage: npm start <day>')
  process.exit(1)
}

main(parseInt(day))

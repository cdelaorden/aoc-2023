import { readInput } from '@/lib/fs'
import * as R from 'remeda'

const setRegex = /(\d+)\s(red|blue|green)/g

type Game = {
  id: number
  sets: Array<{ color: string; qty: number }>
}
const makeGame = (s: string): Game => {
  const [game, rest] = s.split(':')
  const id = Number(game?.replace('Game ', ''))
  const sets: Array<{ color: string; qty: number }> = []
  rest?.split(';').forEach((s) => {
    for (const g of s.matchAll(setRegex)) {
      sets.push({
        qty: Number(g.at(1)),
        color: g.at(2) as string,
      })
    }
  })
  return {
    id,
    sets,
  }
}

const isValidSet =
  (maxRed: number, maxGreen: number, maxBlue: number) => (g: Game) => {
    return (
      g.sets.find(
        (s) =>
          (s.color === 'red' && s.qty > maxRed) ||
          (s.color === 'green' && s.qty > maxGreen) ||
          (s.color === 'blue' && s.qty > maxBlue)
      ) == null
    )
  }

const getMaxOfColor = (color: string) => (acc: number, s: Game['sets'][0]) =>
  s.color === color && s.qty > acc ? s.qty : acc

const calculateMinBalls = (g: Game) => {
  return {
    id: g.id,
    red: g.sets.reduce(getMaxOfColor('red'), 0),
    green: g.sets.reduce(getMaxOfColor('green'), 0),
    blue: g.sets.reduce(getMaxOfColor('blue'), 0),
  }
}

const getPossibleGames = R.createPipe(
  (input: string) => input.split('\n'),
  R.map(makeGame),
  R.filter(isValidSet(12, 13, 14)),
  R.reduce((acc: number, g: Game) => acc + g.id, 0)
)

const getPowerSum = R.createPipe(
  (input: string) => input.split('\n'),
  R.map(makeGame),
  R.map(calculateMinBalls),
  R.reduce((acc, g) => acc + g.red * g.green * g.blue, 0)
)

export async function day2partOne() {
  const input = await readInput(2)
  console.log('part one:', getPossibleGames(input))
}

export async function day2partTwo() {
  const input = await readInput(2)
  console.log('part 2: ', getPowerSum(input))
}

// https://adventofcode.com/2023/day/4

import { intersection, range } from 'remeda'

type Card = {
  id: number
  winner: number[]
  owned: number[]
}

const getCardScore = (c: Card) => {
  return c.winner
    .filter((x) => c.owned.some((y) => y === x))
    .reduce((acc) => {
      if (acc === 0) return 1
      return acc * 2
    }, 0)
}

function parseCards(data: string): Card[] {
  const lines = data.split('\n')
  return lines.map((l, i) => {
    const [left, right] = l.split('|')
    const winner =
      left
        ?.replace(/Card\s+\d+:/, '')
        .trim()
        .split(/\s+/)
        .map(Number) ?? []
    const owned =
      right
        ?.trim()
        .split(/\s+/)
        .map((s) => s.trim())
        .map(Number) ?? []
    return {
      id: i + 1,
      winner,
      owned,
    }
  })
}

export function day4partOne(_sample: string, input: string) {
  const cards = parseCards(input)
  // console.log(cards.slice(0, 10))
  const cardScores = cards.map(getCardScore)
  console.log(
    'Part one: %d',
    cardScores.reduce((acc, x) => acc + x, 0)
  )
}

const getNumOfCopies = (c: Card) => intersection(c.owned, c.winner).length

export function day4partTwo(_sample: string, input: string) {
  const cards = parseCards(input)
  const cardCounter = cards.reduce((acc, c) => {
    acc[c.id] = 1
    return acc
  }, {} as Record<string, number>)
  cards.forEach((c) => {
    const copies = range(c.id + 1, c.id + 1 + getNumOfCopies(c))
    copies.forEach((id) => {
      cardCounter[id] += 1 * (cardCounter[c.id] ?? 0)
    })
  })
  console.log(
    'Part 2: %d',
    Object.values(cardCounter).reduce((acc, x) => acc + x, 0)
  )
}
